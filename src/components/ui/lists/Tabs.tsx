import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

import Badge from "@/components/ui/lists/Badge";

const Tabs: FC<{ children: ReactNode }> & {
    Item: typeof Item;
    ItemBadge: typeof Badge;
} = ({ children }) => {
    return (
        <menu className="flex gap-1 md:gap-4 mb-4" role="tablist">
            {children}
        </menu>
    );
};

const Item: FC<{
    isSelected: boolean;
    onSelect: () => void;
    children: ReactNode;
    title: string;
}> = ({ isSelected, onSelect, children, title }) => {
    return (
        <li className="relative" role="tab" aria-selected={isSelected}>
            <button
                onClick={onSelect}
                className={`flex px-4 py-2 rounded-t-md transition-colors ${
                    isSelected
                        ? "text-blue-600 font-semibold"
                        : "text-gray-500 hover:text-blue-400"
                }`}
            >
                {title}
                {children}
            </button>
            {isSelected && (
                <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-blue-600"
                />
            )}
        </li>
    );
};

Tabs.Item = Item;
Tabs.ItemBadge = Badge;

export default Tabs;
