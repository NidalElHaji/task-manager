import { FC } from "react";

import Button from "../buttons/Button";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { DROPDOWN_SEARCH_LIST } from "../../utils/utils";

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
    const handleDropdownChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        onDropboxChange(event.target.value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(event.target.value);
    };

    return (
        <div className="flex items-center w-full">
            <Dropdown
                className="w-34 px-3 py-2 text-sm font-medium text-gray-700 bg-blue-100 border border-blue-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                options={DROPDOWN_SEARCH_LIST}
                onChange={handleDropdownChange}
                aria-label="Select search criteria"
            />
            <Input
                id="searchbox"
                className="flex-1 px-4 py-2 text-sm text-gray-700 bg-white border-t border-b border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="searchbox"
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleInputChange}
                aria-describedby="searchbox"
            />
            <Button
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="button"
                onClick={onSearch}
                aria-label="Execute search"
            >
                <i className="bi bi-search"></i>
            </Button>
        </div>
    );
};

export default SearchBox;
