import { useState, useEffect } from "react";
import axios from "axios";

import Coin from "./components/coin/Coin";

import "./index.scss";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    try {
      const getData = async () => {
        setLoading(true);
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h"
        );
        setCoins(res.data);
        setLoading(false);
        // console.log(coins)
        // console.log(coins);
      };
      getData();
    } catch (error) {
      alert(error);
      console.log(error.message);
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  }

  const filterArr = coins.filter((coin) => coin.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // TODO: put a spinner if the coins are not yet displayed


  return (
    <div className="app-container">
      <div className="nav-bar">
        <h1>DpCoins</h1>
        <input
          type="text"
          placeholder="Search for a coin"
          onChange={handleSearchChange}
          value={searchInput}
        />
      </div>
      {filterArr.map((coin) => {
        return (
          <Coin coinObj={coin} key={coin.id}/>
        );
      })}
    </div>
  );
}

export default App;
