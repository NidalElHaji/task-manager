import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { Pencil, Trash } from "lucide-react";

import { Task, TaskStatus } from "@/types/taskTypes";
import { formatDate } from "@/utils/utils";
import {
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} from "@/features/tasks/hooks/useTasks";
import { taskActions } from "@/features/tasks/store/taskSlice";
import { AppDispatch } from "@/types/storeTypes";
import { TaskModal } from "@/features/tasks/components";
import { Button } from "@/components";
import classes from "@/utils/classes";

type TaskListItemViewProps = { task: Task };

const statusButtons = [
    {
        status: "failed" as TaskStatus,
        label: "Mark as failed",
        color: "text-red-600 hover:text-red-400",
    },
    {
        status: "active" as TaskStatus,
        label: "Mark as active",
        color: "text-blue-600 hover:text-blue-400",
    },
    {
        status: "completed" as TaskStatus,
        label: "Mark as completed",
        color: "text-green-600 hover:text-green-400",
    },
];

const TaskListItemView: FC<TaskListItemViewProps> = ({ task }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const updateTaskMutation = useUpdateTaskMutation();
    const deleteTaskMutation = useDeleteTaskMutation();

    const filteredStatusButtons = statusButtons.filter(
        ({ status }) => task.status !== status,
    );

    const handleChangeStatus = (status: TaskStatus) => {
        if (task.status !== status) {
            const updatedTask = { ...task, status };

            dispatch(
                taskActions.updateTask({ id: task.id!, task: updatedTask }),
            );

            updateTaskMutation.mutate(updatedTask, {
                onError: () => {
                    dispatch(taskActions.updateTask({ id: task.id!, task }));
                },
            });
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch(taskActions.deleteTask({ id: task.id! }));

            deleteTaskMutation.mutate(task.id!, {
                onError: () => {
                    dispatch(taskActions.createTask({ task }));
                },
            });
        }
    };

    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    const toggleEditing = () => setIsEditing((prev) => !prev);

    return (
        <article className="w-full flex flex-col gap-4 p-4 bg-white rounded-md shadow-md">
            {isEditing && (
                <AnimatePresence>
                    <TaskModal task={task} onClose={toggleEditing} />
                </AnimatePresence>
            )}
            <header className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    {task.image ? (
                        <img
                            src={task.image.src}
                            alt={task.image.alt || task.title}
                            className="w-16 h-16 object-contain"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-md" />
                    )}
                    <div>
                        <h3 className="text-xl font-bold text-blue-300">
                            {task.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {task.deadline
                                ? `Complete until ${formatDate(task.deadline)}`
                                : "No deadline specified"}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button
                        onClick={toggleEditing}
                        type="button"
                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500"
                        disabled={updateTaskMutation.isPending}
                    >
                        <Pencil className={classes.icon} />
                    </Button>
                    <Button
                        onClick={handleDelete}
                        type="button"
                        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500"
                        disabled={deleteTaskMutation.isPending}
                    >
                        <Trash className={classes.icon} />
                    </Button>
                </div>
            </header>
            <div className="flex justify-end gap-4 mt-4">
                {filteredStatusButtons.map(
                    ({ status, label, color }) =>
                        task.status !== status && (
                            <button
                                key={status}
                                onClick={() => handleChangeStatus(status)}
                                className={`${color} ${
                                    updateTaskMutation.isPending
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={updateTaskMutation.isPending}
                            >
                                {label}
                            </button>
                        ),
                )}
            </div>
            <div className="flex flex-col">
                <button
                    onClick={toggleExpanded}
                    aria-expanded={isExpanded}
                    aria-controls={`details-${task.id}`}
                    type="button"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-400"
                >
                    View Details
                    <motion.span
                        className="text-sm"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                    >
                        &#9650;
                    </motion.span>
                </button>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            id={`details-${task.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-2 text-gray-500"
                        >
                            <p>{task.description}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </article>
    );
};

export default TaskListItemView;
