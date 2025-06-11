import { AppDispatch } from "../../../types";
import taskApi from "../services/taskApis";
import { Task } from "../types/TaskTypes";
import { taskActions } from "./taskReducer";

export const fetchTasksData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const tasksData = await taskApi.getTasks();

            const tasksDataFix = Object.entries(tasksData).map(
                ([key, value]: [string, unknown]) => {
                    const task = value as Task;
                    return { ...task, id: key };
                },
            );

            dispatch(taskActions.getTasks({ tasks: tasksDataFix ?? [] }));
        } catch (error) {
            throw new Error(`Error Tasks: Fetching Tasks failed! ${error}`);
        }
    };
};

export const addTaskData = (task: Task) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await taskApi.createTask(task);

            const updatedTask: Task = { ...task, id: response.name };

            dispatch(taskActions.createTask({ task: updatedTask }));
        } catch (error) {
            throw new Error(`Error Tasks: Creating Tasks failed! ${error}`);
        }
    };
};

export const updateTaskData = (task: Task) => {
    return async (dispatch: AppDispatch) => {
        try {
            const updatedTask = {
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                image: task.image,
                status: task.status,
            };

            await taskApi.updateTask(task.id!, updatedTask);

            dispatch(taskActions.updateTask({ id: task.id!, task }));
        } catch (error) {
            throw new Error(`Error Tasks: Updating Tasks failed! ${error}`);
        }
    };
};

export const deleteTaskData = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await taskApi.deleteTask(id);

            dispatch(taskActions.deleteTask({ id }));
        } catch (error) {
            throw new Error(`Error Tasks: Deleting Tasks failed! ${error}`);
        }
    };
};
