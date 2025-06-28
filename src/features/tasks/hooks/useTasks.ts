import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Task } from "@/types/taskTypes";
import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
} from "@/utils/http";
import { storageUtils } from "@/utils/storage";
import { captureSentryException } from "@/utils/sentry";

const BASE_URL = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}tasks`;

const createTaskErrorContext = (
    operation: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalContext?: Record<string, any>,
) => ({
    operation,
    service: "tasks",
    baseUrl: BASE_URL,
    timestamp: new Date().toISOString(),
    environment: import.meta.env.MODE,
    ...additionalContext,
});

export const useTasksQuery = () => {
    return useQuery<Task[]>({
        queryKey: ["tasks"],
        queryFn: async () => {
            try {
                const data = await getRequest(BASE_URL);
                const tasks = Object.entries(data || {}).map(([id, value]) => ({
                    id,
                    ...(value as Omit<Task, "id">),
                }));

                storageUtils.saveTasks(tasks);
                return tasks;
            } catch (error) {
                captureSentryException(
                    error as Error,
                    createTaskErrorContext("fetchTasks", {
                        fallbackToLocal: true,
                        errorSource: "api",
                    }),
                );

                console.error(
                    "API fetch failed, using localStorage data:",
                    error,
                );

                const localTasks = storageUtils.getTasks();
                return localTasks;
            }
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useAddTaskMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newTask: Omit<Task, "id">) => {
            try {
                const response = await postRequest(BASE_URL, newTask);
                return response;
            } catch (error) {
                const tempTask = { ...newTask, id: `temp_${Date.now()}` };

                captureSentryException(
                    error as Error,
                    createTaskErrorContext("addTask", {
                        taskTitle: newTask.title,
                        taskStatus: newTask.status,
                        hasDeadline: Boolean(newTask.deadline),
                        hasImage: Boolean(newTask.image),
                        fallbackAction: "addedToSyncQueue",
                        tempTaskId: tempTask.id,
                    }),
                );

                storageUtils.addPendingSync({
                    action: "create",
                    task: tempTask as Task,
                    timestamp: Date.now(),
                });

                return tempTask;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: (error) => {
            console.error("Failed to add task:", error);
        },
    });
};

export const useUpdateTaskMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedTask: Task) => {
            try {
                const taskData = {
                    title: updatedTask.title,
                    description: updatedTask.description,
                    deadline: updatedTask.deadline,
                    image: updatedTask.image,
                    status: updatedTask.status,
                };

                await putRequest(BASE_URL, {
                    id: updatedTask.id!,
                    value: taskData,
                });

                return updatedTask;
            } catch (error) {
                captureSentryException(
                    error as Error,
                    createTaskErrorContext("updateTask", {
                        taskId: updatedTask.id,
                        taskTitle: updatedTask.title,
                        taskStatus: updatedTask.status,
                        isTemporaryId: updatedTask.id?.startsWith("temp_"),
                        fallbackAction: "addedToSyncQueue",
                    }),
                );

                storageUtils.addPendingSync({
                    action: "update",
                    task: updatedTask,
                    timestamp: Date.now(),
                });

                return updatedTask;
            }
        },
        onMutate: async (updatedTask) => {
            await queryClient.cancelQueries({ queryKey: ["tasks"] });

            const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

            if (previousTasks) {
                const updatedTasks = previousTasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task,
                );
                queryClient.setQueryData<Task[]>(["tasks"], updatedTasks);

                storageUtils.saveTasks(updatedTasks);
            }

            return { previousTasks };
        },
        onError: (error, updatedTask, context) => {
            captureSentryException(
                error as Error,
                createTaskErrorContext("updateTaskRollback", {
                    taskId: updatedTask.id,
                    hadPreviousData: Boolean(context?.previousTasks),
                    rollbackPerformed: Boolean(context?.previousTasks),
                }),
            );

            if (context?.previousTasks) {
                queryClient.setQueryData<Task[]>(
                    ["tasks"],
                    context.previousTasks,
                );
                storageUtils.saveTasks(context.previousTasks);
            }

            console.error("Failed to update task:", error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};

export const useDeleteTaskMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (taskId: string) => {
            try {
                await deleteRequest(BASE_URL, { id: taskId });
                return taskId;
            } catch (error) {
                captureSentryException(
                    error as Error,
                    createTaskErrorContext("deleteTask", {
                        taskId: taskId,
                        isTemporaryId: taskId?.startsWith("temp_"),
                        fallbackAction: "addedToSyncQueue",
                    }),
                );

                storageUtils.addPendingSync({
                    action: "delete",
                    taskId: taskId,
                    timestamp: Date.now(),
                });

                return taskId;
            }
        },
        onMutate: async (taskId) => {
            await queryClient.cancelQueries({ queryKey: ["tasks"] });

            const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

            if (previousTasks) {
                const taskToDelete = previousTasks.find(
                    (task) => task.id === taskId,
                );
                const updatedTasks = previousTasks.filter(
                    (task) => task.id !== taskId,
                );
                queryClient.setQueryData<Task[]>(["tasks"], updatedTasks);

                storageUtils.saveTasks(updatedTasks);

                return { previousTasks, deletedTask: taskToDelete };
            }

            return { previousTasks };
        },
        onError: (error, taskId, context) => {
            captureSentryException(
                error as Error,
                createTaskErrorContext("deleteTaskRollback", {
                    taskId: taskId,
                    hadPreviousData: Boolean(context?.previousTasks),
                    deletedTaskTitle: context?.deletedTask?.title,
                    rollbackPerformed: Boolean(context?.previousTasks),
                }),
            );

            if (context?.previousTasks) {
                queryClient.setQueryData<Task[]>(
                    ["tasks"],
                    context.previousTasks,
                );
                storageUtils.saveTasks(context.previousTasks);
            }

            console.error("Failed to delete task:", error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};
