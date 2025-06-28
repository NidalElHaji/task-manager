const LoadSpinner = () => {
    return (
        <div className="flex items-center justify-center flex-col gap-5">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadSpinner;
