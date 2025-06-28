import { Button } from "@/components";
import classes from "@/utils/classes";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="w-full mt-8 md:p-6 pl-1 p-2 bg-white rounded-lg shadow-md">
            <h1 className={classes.pageTitle}>Page NOT Found</h1>
            <p className="mt-10">
                Sorry, we couldn't find what you were looking for.
            </p>
            <div className="flex justify-end gap-4 mt-4">
                <Link to="/">
                    <Button>Go Home</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
