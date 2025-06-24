import { FC, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import { TaskStatus } from "../features/tasks/types/TaskTypes";
import { filterTaskList } from "../features/tasks/utils/taskUtils";
import { useSearchAndFilter } from "../hooks/useSearchAndFilter";
import { useTasksQuery } from "../features/tasks/hooks/useTasks";
import { taskActions } from "../features/tasks/store/taskReducer";
import { RootState } from "../types";

import TaskTabs from "../features/tasks/components/TaskTabs";
import TaskList from "../features/tasks/components/TaskList";
import TaskModal from "../features/tasks/components/TaskModal";
import Button from "../ui/buttons/Button";
import { CLASSES_PAGE_BODY, CLASSES_PAGE_TITLE } from "../utils/classes";
import SearchBox from "../ui/input/SearchBox";

const TasksPage: FC = () => {
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("active");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const taskList = useSelector((state: RootState) => state.task.taskList);

    const { data: fetchedTasks, isLoading, error, isSuccess } = useTasksQuery();

    useEffect(() => {
        if (isSuccess && fetchedTasks) {
            dispatch(taskActions.getTasks({ tasks: fetchedTasks }));
        }
    }, [isSuccess, fetchedTasks, dispatch]);

    const filteredTasksByStatus = useMemo(() => {
        return filterTaskList(taskList);
    }, [taskList]);

    const displayTasks = filteredTasksByStatus[selectedStatus];

    const {
        searchConfig,
        handleSearchChange,
        handleSearch,
        filteredItems: searchedTasks,
    } = useSearchAndFilter(displayTasks, ["title", "description"], "title");

    const toggleModal = () => setIsModalOpen((prev) => !prev);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-lg text-gray-500">Loading tasks...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-lg text-red-500">
                    Error loading tasks. Please try refreshing the page.
                </div>
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {isModalOpen && <TaskModal onClose={toggleModal} />}
            </AnimatePresence>
            <div id="tasks" className={CLASSES_PAGE_BODY}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className={CLASSES_PAGE_TITLE}>Tasks</h2>
                    <Button
                        type="button"
                        onClick={toggleModal}
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
                    displayTasks={searchedTasks}
                />
            </div>
        </>
    );
};

export default TasksPage;
