import { FC, useRef, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { useDispatch } from "react-redux";

import Modal from "../../../ui/Modal";
import Button from "../../../ui/buttons/Button";
import { addTaskData, updateTaskData } from "../store/taskActions";
import { AppDispatch } from "../../../types";
import { Task, TaskImage } from "../types/TaskTypes";
import images from "../utils/images";
import InputLabel from "../../../ui/input/InputLabel";

type TaskModalProps = {
    onClose: () => void;
    task?: Task;
};

const TaskModal: FC<TaskModalProps> = ({ onClose, task }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const deadlineRef = useRef<HTMLInputElement>(null);

    const [selectedImage, setSelectedImage] = useState<TaskImage>(
        task?.image || { src: "", alt: "" },
    );
    const [invalidFields, setInvalidFields] = useState<string[]>([]);

    const dispatch: AppDispatch = useDispatch();

    const [scope, animate] = useAnimate();

    const handleSelectImage = (image: TaskImage) => {
        setSelectedImage(image);
        setInvalidFields((prev) => prev.filter((val) => val !== "image"));
    };

    const validateFields = () => {
        const invalids: string[] = [];
        if (!titleRef.current?.value.trim()) invalids.push("title");
        if (!descriptionRef.current?.value.trim()) invalids.push("description");
        if (!deadlineRef.current?.value.trim()) invalids.push("deadline");
        if (!selectedImage.src) invalids.push("image");
        return invalids;
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const invalids = validateFields();

        if (invalids.length > 0) {
            setInvalidFields(invalids);
            animate(
                "input, textarea, img",
                { x: [-10, 0, 10, 0] },
                { type: "tween", duration: 0.2, delay: stagger(0.05) },
            );
            return;
        }

        setInvalidFields([]);
        const updatedTask = {
            ...task,
            title: titleRef.current?.value.trim() || "",
            description: descriptionRef.current?.value.trim() || "",
            deadline: deadlineRef.current?.value.trim() || "",
            image: selectedImage,
        };

        if (task) {
            dispatch(updateTaskData({ ...updatedTask, status: task.status! }));
        } else {
            dispatch(addTaskData({ ...updatedTask, status: "active" }));
        }

        onClose();
    }

    return (
        <Modal title={task ? "Edit Task" : "New Task"} onClose={onClose}>
            <form
                id="task-form"
                onSubmit={handleSubmit}
                ref={scope}
                className="space-y-4"
            >
                <InputLabel
                    id="title"
                    label="Title"
                    ref={titleRef}
                    type="text"
                    name="title"
                    defaultValue={task?.title || ""}
                    isInvalid={invalidFields.includes("title")}
                    autoFocus={true}
                />
                <InputLabel
                    id="description"
                    label="Description"
                    ref={descriptionRef}
                    type="text"
                    name="description"
                    defaultValue={task?.description || ""}
                    isInvalid={invalidFields.includes("description")}
                />
                <InputLabel
                    id="deadline"
                    label="Deadline"
                    ref={deadlineRef}
                    type="date"
                    name="deadline"
                    defaultValue={task?.deadline || ""}
                    isInvalid={invalidFields.includes("deadline")}
                />

                <motion.ul
                    className={`grid grid-cols-7 gap-2 mt-6 image-list `}
                >
                    {images.map((image: TaskImage) => (
                        <motion.li
                            key={image.alt}
                            onClick={() => handleSelectImage(image)}
                            className={`w-12 h-12 rounded-full border-2 image ${
                                selectedImage.src === image.src
                                    ? "border-blue-500"
                                    : ""
                            } ${
                                invalidFields.includes("image")
                                    ? "border-red-500"
                                    : ""
                            } ${
                                !invalidFields.includes("image") &&
                                selectedImage.src !== image.src
                                    ? "border-transparent"
                                    : ""
                            } cursor-pointer hover:scale-105`}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </motion.li>
                    ))}
                </motion.ul>

                <div className="flex justify-end gap-4 mt-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-transparent rounded-md hover:text-gray-500"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white"
                    >
                        {task ? "Update" : "Add"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskModal;
