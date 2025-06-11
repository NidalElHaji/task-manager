import { FC } from "react";

type DropdownProps = {
    options:
        | readonly { label: string | number; value: string | number }[]
        | { label: string | number; value: string | number }[];
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
