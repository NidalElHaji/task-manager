import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./styles/index.css";
import AppRouter from "./Routers/AppRouter.tsx";
import store from "./store/index.ts";
import { queryClient } from "./config/tanstack.ts";
import { initializeSentry } from "./config/sentry.ts";

initializeSentry();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <AppRouter />
                {import.meta.env.DEV && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </Provider>
        </QueryClientProvider>
    </StrictMode>,
);
