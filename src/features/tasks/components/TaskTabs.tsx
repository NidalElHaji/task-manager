import { FC } from "react";
import { useSelector } from "react-redux";

import { Task, TaskStatus } from "../../../types/taskTypes";
import { RootState } from "../../../types/storeTypes";
import { filterTaskList } from "../utils/taskUtils";
import { Tabs } from "../../../components";

type TaskTabsProps = {
    selectedStatus: TaskStatus;
    setSelectedStatus: (status: TaskStatus) => void;
};

type TabConfig = {
    title: string;
    status: TaskStatus;
    count: number;
};

const TaskTabs: FC<TaskTabsProps> = ({ selectedStatus, setSelectedStatus }) => {
    const taskList: Task[] = useSelector(
        (state: RootState) => state.task.taskList,
    );

    const { active, completed, failed } = filterTaskList(taskList);

    const tabs: TabConfig[] = [
        { title: "Active", status: "active", count: active.length },
        { title: "Completed", status: "completed", count: completed.length },
        { title: "Failed", status: "failed", count: failed.length },
    ];

    return (
        <Tabs>
            {tabs.map(({ title, status, count }) => (
                <Tabs.Item
                    key={status}
                    title={title}
                    isSelected={selectedStatus === status}
                    onSelect={() => setSelectedStatus(status as TaskStatus)}
                    aria-selected={selectedStatus === status}
                >
                    <Tabs.ItemBadge>{count}</Tabs.ItemBadge>
                </Tabs.Item>
            ))}
        </Tabs>
    );
};

export default TaskTabs;
