import './search-coin.scss'

const SearchCoin = ({coin}) => {
    const { name, symbol, market_cap_rank, thumb } = coin;

  return (
    <div className='search-coin'>
        <div>
            <img src={thumb}/>
            <p>{name}</p>
            <span>({symbol})</span>
        </div>
        <p className='rank'>#{market_cap_rank}</p>
    </div>
  )
}

export default SearchCoin