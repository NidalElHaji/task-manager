import { useState, useMemo } from "react";
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
import { useSearchAndFilter } from "../hooks/useSearchAndFilter";

const TasksPage = () => {
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("active");
    const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);

    const taskList: Task[] = useSelector(
        (state: RootState) => state.task.taskList || [],
    );

    const filteredTasks = useMemo(() => {
        const filtered = filterTaskList(taskList);
        return filtered[selectedStatus] || [];
    }, [taskList, selectedStatus]);

    const {
        searchConfig,
        handleSearchChange,
        handleSearch,
        filteredItems: displayTasks,
    } = useSearchAndFilter<Task>(
        filteredTasks,
        ["title", "description"],
        DROPDOWN_SEARCH_LIST[0].value,
    );

    const handleStartAddNewTask = () => setIsCreatingNewTask(true);
    const handleDoneAddNewTask = () => setIsCreatingNewTask(false);

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
                    <Button
                        type="button"
                        onClick={handleStartAddNewTask}
                        aria-label="Add Task"
                    >
                        Add Task
                    </Button>
                </div>
                <div className="w-full flex mx-auto mt-8 pb-6">
                    <SearchBox
                        onDropboxChange={(value) =>
                            handleSearchChange("dropboxValue", value)
                        }
                        onInputChange={(value) =>
                            handleSearchChange("searchValue", value)
                        }
                        onSearch={handleSearch}
                        searchValue={searchConfig.searchValue}
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
