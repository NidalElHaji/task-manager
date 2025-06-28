import { Task } from "@/types/taskTypes";

interface PendingSync {
    action: "create" | "update" | "delete";
    task?: Task;
    taskId?: string;
    timestamp: number;
}

const TASKS_STORAGE_KEY = "tasks";
const PENDING_SYNC_KEY = "pendingSyncTasks";

export const generateTempId = (): string => {
    return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const storageUtils = {
    getTasks: (): Task[] => {
        try {
            const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error("Error reading tasks from localStorage:", error);
            return [];
        }
    },

    saveTasks: (tasks: Task[]): void => {
        try {
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error("Error saving tasks to localStorage:", error);
        }
    },

    getPendingSync: (): PendingSync[] => {
        try {
            const pending = localStorage.getItem(PENDING_SYNC_KEY);
            return pending ? JSON.parse(pending) : [];
        } catch (error) {
            console.error(
                "Error reading pending sync from localStorage:",
                error,
            );
            return [];
        }
    },

    addPendingSync: (syncItem: PendingSync): void => {
        try {
            const pending = storageUtils.getPendingSync();
            pending.push(syncItem);
            localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(pending));
        } catch (error) {
            console.error("Error adding pending sync:", error);
        }
    },

    removePendingSync: (timestamp: number): void => {
        try {
            const pending = storageUtils.getPendingSync();
            const filtered = pending.filter(
                (item) => item.timestamp !== timestamp,
            );
            localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(filtered));
        } catch (error) {
            console.error("Error removing pending sync:", error);
        }
    },

    clearPendingSync: (): void => {
        try {
            localStorage.removeItem(PENDING_SYNC_KEY);
        } catch (error) {
            console.error("Error clearing pending sync:", error);
        }
    },
};
