// src/features/tasks/api/useTasks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../types/TaskTypes";
import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
} from "../../../utils/http";

const BASE_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export const useTasksQuery = () => {
    return useQuery<Task[]>({
        queryKey: ["tasks"],
        queryFn: async () => {
            const data = await getRequest(BASE_URL);
            return Object.entries(data || {}).map(([id, value]) => ({
                id,
                ...(value as Omit<Task, "id">),
            }));
        },
    });
};

export const useAddTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask: Omit<Task, "id">) =>
            postRequest(BASE_URL, newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};

export const useUpdateTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTask: Task) =>
            putRequest(BASE_URL, { id: updatedTask.id!, value: updatedTask }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};

export const useDeleteTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskId: string) => deleteRequest(BASE_URL, { id: taskId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};
