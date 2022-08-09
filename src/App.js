import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import Coin from "./components/coin/Coin";

import { ReactComponent as Logo } from "../src/assets/icon.svg";
import { ReactComponent as Spinner } from "../src/assets/spinner.svg";

import { useContext } from "react";
import { SearchContext } from "./context/searchbar-context";

import SearchBox from "./components/search-box/search-box-comp";

import "./index.scss";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coinPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    try {
      const getData = async () => {
        setLoading(true);
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=1h%2C24h"
        );
        setCoins(res.data);
        setLoading(false);
      };
      getData();
    } catch (error) {
      alert(error);
      console.log(error.message);
    }
  }, []);

  const [searchloading, setSearchLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // fetch from search api
  useEffect(() => {
    try {
      const getSearchData = async () => {
        setSearchLoading(true);
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${searchInput}`
        );
        setSearchResults(res.data.coins);
        setSearchLoading(false);
      };
      getSearchData();
    } catch (error) {
      alert(error);
    }
  }, []);

  // console.log(searchResults);

  const filterArr = searchResults.filter((coin) =>
    coin.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  // console.log(filterArr);

  const { searchBoxOpen, setSearchBoxopen } = useContext(SearchContext);

  const openSearchBox = () => {
    setSearchBoxopen(true);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const start = currentPage * coinPerPage;
  const end = (currentPage + 1) * coinPerPage;

  const coinsToDisplay = coins.slice(start, end);

  const gotoPage = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="app-container">
      <div className="nav-bar">
        <div className="logo">
          <h1>DpCoins</h1>
          <Logo />
        </div>
        <input
          type="text"
          placeholder="Search for a Coin"
          onChange={handleSearchChange}
          value={searchInput}
          className="search-bar"
          onClick={openSearchBox}
        />
      </div>
      {searchBoxOpen && <SearchBox array={filterArr}/>}
      <div className="title">
        <div className="coin-title">
          <p className="rank">#</p>
          <p>Coin</p>
        </div>
        <div className="title-details">
          <p className="price-title">Price</p>
          <p className="h1-title">1h</p>
          <p className="h24-title">24h</p>
          <p className="volume-title">24h Volume</p>
          <p className="mkt-cap-title">Market Cap</p>
        </div>
      </div>
      {loading ? <Spinner className="spinner" /> : ""}
      {coinsToDisplay.map((coin) => {
        return <Coin coinObj={coin} key={coin.id} />;
      })}
      {!loading && (
        <ReactPaginate
          onPageChange={gotoPage}
          pageCount={Math.ceil(coins.length / coinPerPage)}
          activeClassName="page-active"
          previousClassName="prev-page"
          nextClassName="next-page"
          containerClassName="pages-container"
        />
      )}
    </div>
  );
}

export default App;
