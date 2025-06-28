import { ChangeEvent, FC } from "react";
import { Search } from "lucide-react";

import { Button, Dropdown, Input } from "@/components";
import { DROPDOWN_SEARCH_LIST } from "@/utils/utils";
import classes from "@/utils/classes";

type SearchBoxProps = {
    searchValue: string;
    onDropboxChange: (value: string) => void;
    onInputChange: (value: string) => void;
    onSearch: () => void;
};

const SearchBox: FC<SearchBoxProps> = ({
    searchValue,
    onInputChange,
    onDropboxChange,
    onSearch,
}) => {
    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onDropboxChange(event.target.value);
    };

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        onInputChange(event.target.value);
    };

    return (
        <div className="flex items-center w-full">
            <Dropdown
                className="w-34 px-2.5 py-1 md:py-2 text-sm font-medium text-gray-700 bg-blue-100 border border-blue-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                options={DROPDOWN_SEARCH_LIST}
                onChange={handleDropdownChange}
                aria-label="Select search criteria"
            />
            <Input
                id="searchbox"
                className="flex-1 px-4 py-1 md:py-2 text-sm text-gray-700 bg-white border-t border-b border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="searchbox"
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleInputChange}
                aria-describedby="searchbox"
            />
            <Button
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="button"
                onClick={onSearch}
                aria-label="Execute search"
            >
                <Search className={classes.icon} />
            </Button>
        </div>
    );
};

export default SearchBox;
