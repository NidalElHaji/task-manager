import { captureSentryException } from "@/utils/sentry";

export const getRequest = async (url: string) => {
    try {
        const response = await fetch(`${url}.json`);

        if (!response.ok) {
            const error = new Error(
                `Fetching data failed. Status: ${response.status}`,
            );
            captureSentryException(error, {
                url,
                method: "GET",
                status: response.status,
                statusText: response.statusText,
            });
            throw error;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // Catch network errors, JSON parsing errors, etc.
        if (error instanceof Error && !error.message.includes("Status:")) {
            captureSentryException(error, {
                url,
                method: "GET",
                errorType: "network_or_parsing_error",
            });
        }
        throw error;
    }
};

export const postRequest = async (url: string, payload: object) => {
    try {
        const response = await fetch(`${url}.json`, {
            method: "POST",
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = new Error(
                `Adding data failed. Status: ${response.status}`,
            );
            captureSentryException(error, {
                url,
                method: "POST",
                status: response.status,
                statusText: response.statusText,
                payload: JSON.stringify(payload),
            });
            throw error;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error && !error.message.includes("Status:")) {
            captureSentryException(error, {
                url,
                method: "POST",
                errorType: "network_or_parsing_error",
                payload: JSON.stringify(payload),
            });
        }
        throw error;
    }
};

export const putRequest = async (
    url: string,
    payload: { id: string; value: object },
) => {
    try {
        const response = await fetch(`${url}/${payload.id}.json`, {
            method: "PUT",
            body: JSON.stringify(payload.value),
        });

        if (!response.ok) {
            const error = new Error(
                `Editing data failed. Status: ${response.status}`,
            );
            captureSentryException(error, {
                url: `${url}/${payload.id}`,
                method: "PUT",
                status: response.status,
                statusText: response.statusText,
                payloadId: payload.id,
                payload: JSON.stringify(payload.value),
            });
            throw error;
        }
    } catch (error) {
        if (error instanceof Error && !error.message.includes("Status:")) {
            captureSentryException(error, {
                url: `${url}/${payload.id}`,
                method: "PUT",
                errorType: "network_or_parsing_error",
                payloadId: payload.id,
                payload: JSON.stringify(payload.value),
            });
        }
        throw error;
    }
};

export const deleteRequest = async (url: string, payload: { id: string }) => {
    try {
        const response = await fetch(`${url}/${payload.id}.json`, {
            method: "DELETE",
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = new Error(
                `Deleting data failed. Status: ${response.status}`,
            );
            captureSentryException(error, {
                url: `${url}/${payload.id}`,
                method: "DELETE",
                status: response.status,
                statusText: response.statusText,
                payloadId: payload.id,
            });
            throw error;
        }
    } catch (error) {
        if (error instanceof Error && !error.message.includes("Status:")) {
            captureSentryException(error, {
                url: `${url}/${payload.id}`,
                method: "DELETE",
                errorType: "network_or_parsing_error",
                payloadId: payload.id,
            });
        }
        throw error;
    }
};
