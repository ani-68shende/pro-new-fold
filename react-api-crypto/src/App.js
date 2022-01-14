import './App.css';
import axios from 'axios'
import './App.css';
import React, { useState, useEffect } from 'react';
import Coin from './Coin';
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {

    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
      }).catch(err => console.log(err));
  }, []);

  const handleChange = event => {
    setSearch(event.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input type='text' placeholder='Search' className='coin-input' onChange={handleChange} />
        </form>
      </div>
      <div className="header_name">
        <div className="coin-container">
          <div className="coin-row">
            <div className="coin">
              <h1>Coin Name  </h1>
              <p className="coin-symbol">Symbol</p>
              <div className="coin-data">
                <p className='coin-price'>Price</p>
                <p className='coin-volume'>Volume</p>
                <p className="coin-percent">% change</p>
                <p className="coin-marketcap">Market Cap</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {filteredCoins.map(coin => {
          return (
            <Coin key={coin}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              volume={coin.total_volume}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              marketcap={coin.market_cap} />);
        })}
      </div>
    </div >
  );
}

export default App;
