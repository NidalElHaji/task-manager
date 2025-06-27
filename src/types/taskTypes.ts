export type TaskStatus = "active" | "completed" | "failed";

export type TaskImage = { src: string; alt: string };

export type Task = {
    id?: string;
    title: string;
    description: string;
    deadline: string;
    image?: TaskImage;
    status: TaskStatus;
};
