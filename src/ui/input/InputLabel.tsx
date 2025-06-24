import { FC, RefObject } from "react";
import Label from "./Label";
import Input from "./Input";

type InputLabelProps = {
    label: string;
    name: string;
    type: string;
    isInvalid?: boolean;
    id?: string;
    ref?: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
    defaultValue?: string;
    autoFocus?: boolean;
    disabled?: boolean;
};

const InputLabel: FC<InputLabelProps> = ({
    name,
    label,
    type,
    isInvalid = false,
    ...props
}) => {
    return (
        <>
            <Label name={name} value={label} />
            <Input isInvalid={isInvalid} type={type} {...props} />
        </>
    );
};

export default InputLabel;
