import { FC, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { TaskStatus, Task } from "@/types/taskTypes";
import { filterTaskList } from "@/features/tasks/utils/taskUtils";
import { useSearchAndFilter } from "@/hooks/useSearchAndFilter";
import { useTasksQuery } from "@/features/tasks/hooks/useTasks";
import { taskActions } from "@/features/tasks/store/taskSlice";
import { RootState } from "@/types/storeTypes";
import { TaskList, TaskModal, TaskTabs } from "@/features/tasks/components";
import { classes } from "@/utils/classes";
import LoadingPage from "@/pages/common/LoadingPage";
import ErrorPage from "@/pages/common/ErrorPage";
import { Button, SearchBox } from "@/components";

interface LoaderData {
    tasks: Task[];
    source: "api" | "localStorage";
}

const TasksPage: FC = () => {
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("active");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const taskList = useSelector((state: RootState) => state.task.taskList);
    const loaderData = useLoaderData() as LoaderData;

    const { data: fetchedTasks, isLoading, error, isSuccess } = useTasksQuery();

    useEffect(() => {
        if (loaderData?.tasks && taskList.length === 0) {
            dispatch(taskActions.getTasks({ tasks: loaderData.tasks }));
        }
    }, [loaderData, taskList.length, dispatch]);

    useEffect(() => {
        if (isSuccess && fetchedTasks) {
            if (
                loaderData?.tasks &&
                fetchedTasks.length !== loaderData.tasks.length
            ) {
                console.warn("Data sync issue detected", {
                    fetchedCount: fetchedTasks.length,
                    cachedCount: loaderData.tasks.length,
                    source: loaderData.source,
                });
            }

            dispatch(taskActions.getTasks({ tasks: fetchedTasks }));
        }
    }, [isSuccess, fetchedTasks, dispatch, loaderData]);

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

    if (isLoading && taskList.length === 0) {
        return <LoadingPage />;
    }

    if (error && (!loaderData?.tasks || loaderData.tasks.length === 0)) {
        console.error("Tasks page error:", {
            error,
            hasLoaderData: !!loaderData?.tasks,
            loaderDataLength: loaderData?.tasks?.length || 0,
            taskListLength: taskList.length,
        });

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

                {loaderData?.source === "localStorage" && isLoading && (
                    <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
                        Using cached data. Syncing with server...
                    </div>
                )}

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
