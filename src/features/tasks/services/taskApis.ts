import {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest,
} from "../../../utils/http";
import { Task } from "../types/TaskTypes";

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

const getTasks = async () => {
    const data = await getRequest(`${API_URL}`);
    return data;
};

const createTask = async (task: Task) => {
    const data = await postRequest(`${API_URL}`, task);
    return data;
};

const updateTask = async (id: string, task: Task) => {
    await putRequest(`${API_URL}`, { id: id, value: task });
};

const deleteTask = async (id: string) => {
    await deleteRequest(`${API_URL}`, { id });
};

const taskApi = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};

export default taskApi;
