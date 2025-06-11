export const getRequest = async (url: string) => {
    const response = await fetch(`${url}.json`);

    if (!response.ok) {
        throw new Error("Fetching data failed.");
    }

    const data = await response.json();

    return data;
};

export const postRequest = async (url: string, payload: object) => {
    const response = await fetch(`${url}.json`, {
        method: "POST",
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Adding data failed.");
    }

    const data = await response.json();

    return data;
};

export const putRequest = async (
    url: string,
    payload: { id: string; value: object },
) => {
    const response = await fetch(`${url}/${payload.id}.json`, {
        method: "PUT",
        body: JSON.stringify(payload.value),
    });

    if (!response.ok) {
        throw new Error("editing data failed.");
    }
};

export const deleteRequest = async (url: string, payload: { id: string }) => {
    const response = await fetch(`${url}/${payload.id}.json`, {
        method: "DELETE",
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("deleting data failed.");
    }
};
