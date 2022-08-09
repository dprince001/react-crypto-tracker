import { useContext } from "react";
import { SearchContext } from "../../context/searchbar-context";

import SearchCoin from "../search-coin/search-coin";

import "./search-box.scss";

const SearchBox = ({ array }) => {

  const { searchBoxOpen, setSearchBoxopen } = useContext(SearchContext);

  const handleCancelClick = () => {
    setSearchBoxopen(false);
  };

  return (
    <div className="search-box-container">
      <span className="cancel-search" onClick={handleCancelClick}>X</span>
      {array.slice(0, 7).map((coin) => {
        return (
            <SearchCoin coin={coin} key={coin.id}/>
        )
      })}
    </div>
  );
};

export default SearchBox;
