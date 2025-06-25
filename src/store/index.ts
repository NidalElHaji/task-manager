import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/store/authReducer";
import taskSlice from "../features/tasks/store/taskReducer";

const store = configureStore({
    reducer: {
        auth: authSlice,
        task: taskSlice,
    },
});

export default store;
