import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/features/auth/store/authSlice";
import { taskReducer } from "@/features/tasks/store/taskSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
    },
});

export default store;
