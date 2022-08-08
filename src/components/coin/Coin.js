const Coin = ({ coinObj }) => {
  const {
    id,
    market_cap_rank,
    symbol,
    name,
    image,
    current_price,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    total_volume,
    market_cap,
  } = coinObj;

  return (
    <div className="coin-container">
      <p className="rank">{market_cap_rank}</p>
      <div className="coin">
        <img src={image} />
        <div>
          <h4>{name}</h4>
          <p>{symbol}</p>
        </div>
      </div>

      <div className="coin-details">
        <p className="price">{current_price}</p>
        <p className="price-1h">
          {price_change_percentage_1h_in_currency.toFixed(2)}
        </p>
        <p className="price-24h">
          {price_change_percentage_24h_in_currency.toFixed(2)}
        </p>
        <p className="24h-volume">${total_volume.toLocaleString()}</p>
        <p className="market-cap">${market_cap.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Coin;
