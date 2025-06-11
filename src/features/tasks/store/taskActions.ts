import { AppDispatch } from "../../../types";
import { generateTempId, storageUtils } from "../../../utils/storage";
import taskApi from "../services/taskApis";
import { Task } from "../types/TaskTypes";
import { taskActions } from "./taskReducer";

export const fetchTasksData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const localTasks = storageUtils.getTasks();

            if (localTasks.length > 0) {
                dispatch(taskActions.getTasks({ tasks: localTasks }));
            }

            const tasksData = await taskApi.getTasks();
            const tasksDataFix = Object.entries(tasksData).map(
                ([key, value]: [string, unknown]) => {
                    const task = value as Task;
                    return { ...task, id: key };
                },
            );

            storageUtils.saveTasks(tasksDataFix ?? []);

            dispatch(taskActions.getTasks({ tasks: tasksDataFix ?? [] }));
        } catch (error) {
            const localTasks = storageUtils.getTasks();

            dispatch(taskActions.getTasks({ tasks: localTasks }));

            console.error("API fetch failed, using localStorage data:", error);
        }
    };
};

export const addTaskData = (task: Task) => {
    return async (dispatch: AppDispatch) => {
        try {
            const tempId = generateTempId();
            const taskWithTempId: Task = { ...task, id: tempId };

            const localTasks = storageUtils.getTasks();
            const updatedTasks = [...localTasks, taskWithTempId];

            storageUtils.saveTasks(updatedTasks);

            dispatch(taskActions.createTask({ task: taskWithTempId }));

            try {
                const response = await taskApi.createTask(task);
                const finalTask: Task = { ...task, id: response.name };

                const currentTasks = storageUtils.getTasks();
                const tasksWithRealId = currentTasks.map((t) =>
                    t.id === tempId ? finalTask : t,
                );

                storageUtils.saveTasks(tasksWithRealId);

                dispatch(
                    taskActions.updateTask({ id: tempId, task: finalTask }),
                );
            } catch (apiError) {
                storageUtils.addPendingSync({
                    action: "create",
                    task: taskWithTempId,
                    timestamp: Date.now(),
                });

                console.error(
                    "API create failed, task saved locally:",
                    apiError,
                );
            }
        } catch (error) {
            throw new Error(`Error Tasks: Creating Tasks failed! ${error}`);
        }
    };
};

export const updateTaskData = (task: Task) => {
    return async (dispatch: AppDispatch) => {
        try {
            const localTasks = storageUtils.getTasks();
            const updatedTasks = localTasks.map((t) =>
                t.id === task.id ? task : t,
            );

            storageUtils.saveTasks(updatedTasks);

            dispatch(taskActions.updateTask({ id: task.id!, task }));

            try {
                const updatedTask = {
                    title: task.title,
                    description: task.description,
                    deadline: task.deadline,
                    image: task.image,
                    status: task.status,
                };

                await taskApi.updateTask(task.id!, updatedTask);
            } catch (apiError) {
                storageUtils.addPendingSync({
                    action: "update",
                    task,
                    timestamp: Date.now(),
                });

                console.error(
                    "API update failed, task updated locally:",
                    apiError,
                );
            }
        } catch (error) {
            throw new Error(`Error Tasks: Updating Tasks failed! ${error}`);
        }
    };
};

export const deleteTaskData = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const localTasks = storageUtils.getTasks();
            const filteredTasks = localTasks.filter((t) => t.id !== id);

            storageUtils.saveTasks(filteredTasks);

            dispatch(taskActions.deleteTask({ id }));

            try {
                await taskApi.deleteTask(id);
            } catch (apiError) {
                storageUtils.addPendingSync({
                    action: "delete",
                    taskId: id,
                    timestamp: Date.now(),
                });

                console.error(
                    "API delete failed, task deleted locally:",
                    apiError,
                );
            }
        } catch (error) {
            throw new Error(`Error Tasks: Deleting Tasks failed! ${error}`);
        }
    };
};
