import { Task } from "@/types/taskTypes";

export const filterTaskList = (taskList: Task[]) => {
    return {
        active: taskList.filter((task) => task.status === "active"),
        completed: taskList.filter((task) => task.status === "completed"),
        failed: taskList.filter((task) => task.status === "failed"),
    };
};
