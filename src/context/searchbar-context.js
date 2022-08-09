import { createContext, useState } from "react";

export const SearchContext = createContext({
    searchBoxOpen: false,
    setSearchBoxopen: () => {}
});

export const SearchProvider = ({children}) => {
    const [searchBoxOpen, setSearchBoxopen] = useState(false);
    const value = {searchBoxOpen, setSearchBoxopen};

    return (
        <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
    )
}