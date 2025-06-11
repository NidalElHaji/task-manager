import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, FC } from "react";

const List: FC<{ children: ReactNode }> & {
    Item: typeof Item;
    Fallback: typeof Fallback;
} = ({ children }) => {
    return (
        <AnimatePresence mode="popLayout">
            <motion.ol
                key="list"
                className="space-y-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
            >
                {children}
            </motion.ol>
        </AnimatePresence>
    );
};

const Item: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <motion.li
            layout
            className="p-0.5 rounded-md bg-blue-200 shadow"
            exit={{ opacity: 0, y: -30 }}
        >
            {children}
        </motion.li>
    );
};

const Fallback: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <motion.li
            key="fallback"
            className="text-gray-400 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            {children}
        </motion.li>
    );
};

List.Item = Item;
List.Fallback = Fallback;

export default List;
