import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import AppRouter from "./Routers/AppRouter.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </StrictMode>,
);
