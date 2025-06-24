import { ChangeEvent, FC } from "react";

type DropdownProps = {
    options:
        | readonly { label: string | number; value: string | number }[]
        | { label: string | number; value: string | number }[];
    className?: string;
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown: FC<DropdownProps> = ({ options, ...props }) => {
    return (
        <>
            <select {...(props as object)}>
                {options.map(({ label, value }) => (
                    <option value={value} key={value}>
                        {label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Dropdown;
