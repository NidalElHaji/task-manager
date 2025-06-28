import { Task } from "@/types/taskTypes";
import { captureSentryException } from "@/utils/sentry";

interface PendingSync {
    action: "create" | "update" | "delete";
    task?: Task;
    taskId?: string;
    timestamp: number;
}

const TASKS_STORAGE_KEY = "tasks";
const PENDING_SYNC_KEY = "pendingSyncTasks";

export const generateTempId = (): string => {
    return `temp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const storageUtils = {
    getTasks: (): Task[] => {
        try {
            const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error("Error reading tasks from localStorage:", error);

            if (error instanceof Error) {
                captureSentryException(error, {
                    operation: "getTasks",
                    storageKey: TASKS_STORAGE_KEY,
                    errorType: "storage_read_error",
                });
            }

            return [];
        }
    },

    saveTasks: (tasks: Task[]): void => {
        try {
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error("Error saving tasks to localStorage:", error);

            if (error instanceof Error) {
                captureSentryException(error, {
                    operation: "saveTasks",
                    storageKey: TASKS_STORAGE_KEY,
                    taskCount: tasks.length,
                    errorType: "storage_write_error",
                    isQuotaError: error.name === "QuotaExceededError",
                });
            }
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

            if (error instanceof Error) {
                captureSentryException(error, {
                    operation: "getPendingSync",
                    storageKey: PENDING_SYNC_KEY,
                    errorType: "storage_read_error",
                });
            }

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

            if (error instanceof Error) {
                captureSentryException(error, {
                    operation: "addPendingSync",
                    storageKey: PENDING_SYNC_KEY,
                    syncAction: syncItem.action,
                    taskId: syncItem.taskId,
                    errorType: "storage_write_error",
                    isQuotaError: error.name === "QuotaExceededError",
                });
            }
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

            if (error instanceof Error) {
                captureSentryException(error, {
                    operation: "removePendingSync",
                    storageKey: PENDING_SYNC_KEY,
                    timestamp,
                    errorType: "storage_write_error",
                });
            }
        }
    },

    clearPendingSync: (): void => {
        try {
            localStorage.removeItem(PENDING_SYNC_KEY);
        } catch (error) {
            console.error("Error clearing pending sync:", error);

            if (error instanceof Error) {
                captureSentryException(error, {
                    operation: "clearPendingSync",
                    storageKey: PENDING_SYNC_KEY,
                    errorType: "storage_clear_error",
                });
            }
        }
    },

    checkStorageHealth: (): { available: boolean; error?: string } => {
        try {
            const testKey = "__storage_test__";
            const testValue = "test";

            localStorage.setItem(testKey, testValue);
            const retrieved = localStorage.getItem(testKey);
            localStorage.removeItem(testKey);

            if (retrieved !== testValue) {
                throw new Error("Storage read/write mismatch");
            }

            return { available: true };
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown storage error";

            if (error instanceof Error) {
                captureSentryException(error, {
                    operation: "checkStorageHealth",
                    errorType: "storage_health_check_failed",
                });
            }

            return { available: false, error: errorMessage };
        }
    },
};
