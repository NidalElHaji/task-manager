import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import TaskList from "../features/tasks/components/TaskList";
import TaskTabs from "../features/tasks/components/TaskTabs";
import { Task, TaskStatus } from "../features/tasks/types/TaskTypes";
import Button from "../ui/buttons/Button";
import TaskModal from "../features/tasks/components/TaskModal";
import SearchBox from "../ui/input/SearchBox";
import { RootState } from "../types";
import { filterTaskList } from "../features/tasks/utils/taskUtils";
import { DROPDOWN_SEARCH_LIST } from "../utils/utils";

const TasksPage = () => {
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("active");
    const [isCreatingNewTask, setIsCreatingNewTask] = useState<boolean>(false);
    const [dropboxValue, setDropboxValue] = useState<string>(
        DROPDOWN_SEARCH_LIST[0].value,
    );
    const [searchValue, setSearchValue] = useState<string>("");
    const [displayTasks, setDisplayTasks] = useState<Task[]>([]);

    const taskList: Task[] = useSelector(
        (state: RootState) => state.task.taskList,
    );

    useEffect(() => {
        const filteredTaskList = filterTaskList(taskList);
        const displayFilterTasks = filteredTaskList[selectedStatus] || [];

        setDisplayTasks(() => displayFilterTasks);
    }, [selectedStatus, taskList]);

    function handleStartAddNewTask() {
        setIsCreatingNewTask(true);
    }

    function handleDoneAddNewTask() {
        setIsCreatingNewTask(false);
    }

    const onDropboxChange = (value: string) => {
        setDropboxValue(value);
    };

    const onInputChange = (value: string) => {
        setSearchValue(value);
    };

    const onSearch = () => {
        const filteredTaskList = filterTaskList(taskList);
        const displayFilterTasks = filteredTaskList[selectedStatus] || [];

        if (searchValue.trim() === "") {
            setDisplayTasks(displayFilterTasks);
        } else {
            setDisplayTasks(
                displayTasks.filter((task: Task) => {
                    if (dropboxValue === "description") {
                        return task.description
                            .toLowerCase()
                            .includes(searchValue.toLowerCase());
                    }
                    if (dropboxValue === "title") {
                        return task.title
                            .toLowerCase()
                            .includes(searchValue.toLowerCase());
                    }
                    return false;
                }),
            );
        }

        console.log(displayTasks);
    };

    return (
        <>
            <AnimatePresence>
                {isCreatingNewTask && (
                    <TaskModal onClose={handleDoneAddNewTask} />
                )}
            </AnimatePresence>
            <div
                id="tasks"
                className="w-full mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Tasks
                    </h2>
                    <Button type="button" onClick={handleStartAddNewTask}>
                        Add Task
                    </Button>
                </div>
                <div className="w-full flex mx-auto mt-8 pb-6">
                    <SearchBox
                        onDropboxChange={onDropboxChange}
                        onInputChange={onInputChange}
                        onSearch={onSearch}
                        searchValue={searchValue}
                    />
                </div>
                <TaskTabs
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />
                <TaskList
                    selectedStatus={selectedStatus}
                    displayTasks={displayTasks}
                />
            </div>
        </>
    );
};

export default TasksPage;
