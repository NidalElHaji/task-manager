import { FC, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import { TaskStatus } from "@/types/taskTypes";
import { filterTaskList } from "@/features/tasks/utils/taskUtils";
import { useSearchAndFilter } from "@/hooks/useSearchAndFilter";
import { useTasksQuery } from "@/features/tasks/hooks/useTasks";
import { taskActions } from "@/features/tasks/store/taskReducer";
import { RootState } from "@/types/storeTypes";
import { TaskList, TaskModal, TaskTabs } from "@/features/tasks/components";
import classes from "@/utils/classes";
import LoadingPage from "@/pages/common/LoadingPage";
import ErrorPage from "@/pages/common/ErrorPage";
import { Button, SearchBox } from "@/components";

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
        return <LoadingPage />;
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            <AnimatePresence>
                {isModalOpen && <TaskModal onClose={toggleModal} />}
            </AnimatePresence>
            <div id="tasks" className={classes.pageBody}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className={classes.pageTitle}>Tasks</h2>
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
