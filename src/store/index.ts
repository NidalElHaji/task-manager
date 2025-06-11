import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../features/tasks/store/taskReducer";

const store = configureStore({
    reducer: {
        task: taskSlice,
    },
});

export default store;
