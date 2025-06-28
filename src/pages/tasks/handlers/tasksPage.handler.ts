import store from "@/store";
import { fetchTasksData } from "@/features/tasks/store/taskActions";

export const tasksLoader = async () => {
    await store.dispatch(fetchTasksData());

    return null;
};
