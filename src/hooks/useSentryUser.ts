import * as Sentry from "@sentry/react";
import { User } from "../types/authTypes";

export const useSentryUser = () => {
    const setUser = (user: User) => {
        Sentry.setUser({
            id: user.id,
            email: user.email,
            username: user.name,
        });
    };

    const clearUser = () => {
        Sentry.setUser(null);
    };

    return { setUser, clearUser };
};
