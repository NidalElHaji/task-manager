export const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("nl-BE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

export const DROPDOWN_SEARCH_LIST = Object.freeze([
    { label: "Title", value: "title" },
    { label: "Description", value: "description" },
]);
