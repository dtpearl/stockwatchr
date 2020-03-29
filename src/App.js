import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import logo from './logo.svg';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [exchangeData, setExchangeData] = useState(null);

  const getStockExchanges = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://finnhub.io/api/v1/stock/exchange',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'finnhub-realtime-stock-price.p.rapidapi.com',
        'x-rapidapi-key': '0528c28546msh55d3c2717da7e56p1dd338jsn36e304b63751'
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

  const stockSymbolRequest = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://finnhub-realtime-stock-price.p.rapidapi.com/stock/candle',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'finnhub-realtime-stock-price.p.rapidapi.com',
        'x-rapidapi-key': '0528c28546msh55d3c2717da7e56p1dd338jsn36e304b63751'
      },
      params: {
        symbol: 'GOOG',
        resolution: 'D',
        from: new Date('2019.01.01').getTime() / 1000,
        to: new Date('2020.01.01').getTime() / 1000
      }
    })
      .then(response => {
        console.log(response);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getStockExchanges();
    stockSymbolRequest();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        {loading ? (
          <CircularProgress />
        ) : (
          <img src={logo} className='App-logo' alt='logo' />
        )}

        {data && (
          <>
            <p>{`The number of items returned is ${data.length}`}</p>
            <p>{`The number of items returned is ${data.length}`}</p>
            <p>{`The number of items returned is ${data.length}`}</p>
            <p>{`The number of items returned is ${data.length}`}</p>
          </>
        )}
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
