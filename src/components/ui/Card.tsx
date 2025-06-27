import { ReactNode } from "react";

type CardProps = {
    children: ReactNode;
    className?: string;
};

const Card = ({ children, className = "" }: CardProps) => (
    <div
        className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}
    >
        {children}
    </div>
);

const CardHeader = ({ children, className = "" }: CardProps) => (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = "" }: CardProps) => (
    <h2 className={className}>{children}</h2>
);

const CardContent = ({ children, className = "" }: CardProps) => (
    <div className={`px-6 py-4 ${className}`}>{children}</div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export default Card;
