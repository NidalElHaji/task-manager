import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./styles/index.css";
import AppRouter from "./Routers/AppRouter.tsx";
import store from "./store/index.ts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 1,
        },
    },
});

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
