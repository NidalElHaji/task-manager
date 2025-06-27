import { FC } from "react";

type labelProps = {
    name: string;
    value: string | number;
};

const Label: FC<labelProps> = ({ name, value }) => {
    return (
        <label htmlFor={name} className="block font-medium text-gray-700">
            {value}
        </label>
    );
};

export default Label;
