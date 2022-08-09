import './search-coin.scss'

const SearchCoin = ({coin}) => {
    const { name, symbol, market_cap_rank } = coin;

  return (
    <div className='search-coin'>
        <div>
            <p>{name}</p>
            (<span>{symbol}</span>)
        </div>
        <p>#{market_cap_rank}</p>
    </div>
  )
}

export default SearchCoin