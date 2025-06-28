import { createSlice } from "@reduxjs/toolkit";

import { Task } from "@/types/taskTypes";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        taskList: [] as Task[],
    },
    reducers: {
        getTasks(state, action: { payload: { tasks: Task[] } }) {
            state.taskList = action.payload.tasks;
        },
        createTask(state, action: { payload: { task: Task } }) {
            state.taskList.push(action.payload.task);
        },
        updateTask(
            state,
            action: { payload: { id: string; task: Partial<Task> } },
        ) {
            state.taskList = state.taskList.map((task) =>
                task.id === action.payload.id
                    ? { ...task, ...action.payload.task }
                    : task,
            );
        },
        deleteTask(state, action: { payload: { id: string } }) {
            state.taskList = state.taskList.filter(
                (task) => task.id !== action.payload.id,
            );
        },
    },
});

export const taskActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
