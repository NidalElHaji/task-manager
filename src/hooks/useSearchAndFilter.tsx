import { useState, useMemo } from "react";

export type SearchConfig<T> = {
    dropboxValue: keyof T | string;
    searchValue: string;
};

export const useSearchAndFilter = <T extends object>(
    items: T[],
    filterKeys: (keyof T | string)[],
    defaultDropdownKey: keyof T | string,
) => {
    const [searchConfig, setSearchConfig] = useState<SearchConfig<T>>({
        dropboxValue: defaultDropdownKey,
        searchValue: "",
    });
    const [filteredItems, setFilteredItems] = useState<T[]>(items);

    const handleSearchChange = (key: keyof SearchConfig<T>, value: string) => {
        setSearchConfig((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearch = () => {
        const searchTerm = searchConfig.searchValue.trim().toLowerCase();
        if (!searchTerm) {
            setFilteredItems(items);
            return;
        }

        setFilteredItems(
            items.filter((item) => {
                const dropdownKey = searchConfig.dropboxValue as keyof T;

                if (!filterKeys.includes(dropdownKey)) return false;

                const fieldValue = item[dropdownKey] as unknown as string;

                return (
                    typeof fieldValue === "string" &&
                    fieldValue.toLowerCase().includes(searchTerm)
                );
            }),
        );
    };

    useMemo(() => {
        setFilteredItems(items);
    }, [items]);

    return {
        searchConfig,
        handleSearchChange,
        handleSearch,
        filteredItems,
    };
};
