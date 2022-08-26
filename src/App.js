import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

import { TablePagination } from "@mui/material";


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
  const [coinPerPage, setCoinPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    try {
      const getData = async () => {
        setLoading(true);
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h"
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


  const handleChangePage = (event,newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setCoinPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  if(loading) {
    return <Spinner className="spinner" />;
  }

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
      {searchBoxOpen && <SearchBox array={filterArr} />}
      {/* <div className="title">
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
      })} */}

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  minWidth: 20,
                }}
              >
                #
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  minWidth: 200,
                }}
              >
                Coin
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>1h</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>24h</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>24h Volume</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Market Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinsToDisplay.map((row) => (
              <TableRow
                key={row.market_cap_rank}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ position: "sticky", left: 0, minWidth: 20 }}
                >
                  {row.market_cap_rank}
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: 200,
                    position: "sticky",
                    left: 0,
                  }}
                >
                  {row.name} ({row.symbol})
                </TableCell>
                <TableCell>${row.current_price.toLocaleString()}</TableCell>
                <TableCell
                  className={`red ${
                    row.price_change_percentage_1h_in_currency < 0
                      ? "red"
                      : "green"
                  }`}
                >
                  {row.price_change_percentage_1h_in_currency.toFixed(2)}%
                </TableCell>
                <TableCell>
                  {row.price_change_percentage_24h_in_currency.toFixed(2)}%
                </TableCell>
                <TableCell>${row.total_volume.toLocaleString()}</TableCell>
                <TableCell>${row.market_cap.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        sx={{ align: "center" }}
        rowsPerPageOptions={[10, 20]}
        count={coins.length}
        rowsPerPage={coinPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default App;
