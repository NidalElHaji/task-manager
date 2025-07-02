const styles = {
    info: {
        text: "text-blue-800",
        bg: "bg-blue-100",
        border: "border-blue-800",
    },
    warning: {
        text: "text-yellow-800",
        bg: "bg-yellow-100",
        border: "border-yellow-800",
    },
    error: {
        text: "text-red-800",
        bg: "bg-red-100",
        border: "border-red-800",
    },
};

type MessageBoxProps = {
    type: keyof typeof styles;
    title?: string;
    message: string;
};

const MessageBox = ({ type, title, message }: MessageBoxProps) => {
    const { text, bg, border } = styles[type];

    return (
        <div className={`mb-4 p-2 ${text} ${bg} rounded border-2 ${border}`}>
            {title && <h2 className={text}>{title}</h2>}
            <span className={text}>{message}</span>
        </div>
    );
};

export default MessageBox;
