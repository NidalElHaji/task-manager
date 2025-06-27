import { FC } from "react";

import { Task, TaskStatus } from "../../../types/taskTypes";
import { List } from "../../../components";
import TaskListItemView from "./TaskListItemView";

type TaskListProps = { selectedStatus: TaskStatus; displayTasks: Task[] };

const fallbackMessages: Record<TaskStatus, string> = {
    active: "No active tasks at the moment.",
    completed: "No completed tasks to show.",
    failed: "No failed tasks found.",
};

const TaskList: FC<TaskListProps> = ({ selectedStatus, displayTasks }) => {
    return (
        <List key={selectedStatus}>
            {displayTasks.length > 0 ? (
                displayTasks.map((task) => (
                    <List.Item key={task.id}>
                        <TaskListItemView task={task} />
                    </List.Item>
                ))
            ) : (
                <List.Fallback aria-live="polite">
                    {fallbackMessages[selectedStatus]}
                </List.Fallback>
            )}
        </List>
    );
};

export default TaskList;
