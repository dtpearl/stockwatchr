import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import FINNHUB_API_TOKEN from '../src/authtoken';
import logo from './logo.svg';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [symbolsData, setSymbolsData] = useState(null);
  const [exchangeData, setExchangeData] = useState(null);
  const [candleData, setCandleData] = useState(null);

  const getStockExchanges = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://finnhub.io/api/v1/stock/exchange',
      params: {
        token: FINNHUB_API_TOKEN
      }
    })
      .then(response => {
        console.log(response);
        setExchangeData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const getStockSymbols = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://finnhub.io/api/v1/stock/symbol',
      params: {
        token: FINNHUB_API_TOKEN,
        exchange: 'AX'
      }
    })
      .then(response => {
        console.log(response);
        setSymbolsData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const getStockCandle = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://finnhub.io/api/v1/stock/candle',
      params: {
        token: FINNHUB_API_TOKEN,
        exchange: 'AX',
        symbol: 'VAF.AX',
        resolution: 'D',
        from: new Date('2020.01.01').getTime() / 1000,
        to: new Date('2020.03.30').getTime() / 1000
      }
    })
      .then(response => {
        console.log(response);
        setCandleData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getStockExchanges();
    getStockSymbols();
    getStockCandle();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        {loading ? (
          <CircularProgress />
        ) : (
          <img src={logo} className='App-logo' alt='logo' />
        )}
        {symbolsData &&
          symbolsData.map((symbol, i) => {
            return <p key={i}>{symbol.symbol.slice(0, -3)}</p>;
          })}
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
