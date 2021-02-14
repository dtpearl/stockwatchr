import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FINNHUB_API_TOKEN from '../src/authtoken';
import logo from './logo.svg';
import './App.css';


function App() {
  const [loading, setLoading] = useState(false);
  const [symbolsData, setSymbolsData] = useState(null); 
  const [selectedSymbol, setSelectedSymbol] = useState('');
  // const [exchangeData, setExchangeData] = useState(null);
  // const [candleData, setCandleData] = useState(null);

  // const getStockExchanges = () => {
  //   setLoading(true);
  //   axios({
  //     method: 'GET',
  //     url: 'https://finnhub.io/api/v1/stock/exchange',
  //     params: {
  //       token: FINNHUB_API_TOKEN
  //     }
  //   })
  //     .then(response => {
  //       console.log(response);
  //       setExchangeData(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // };

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

  // const getStockCandle = () => {
  //   setLoading(true);
  //   axios({
  //     method: 'GET',
  //     url: 'https://finnhub.io/api/v1/stock/candle',
  //     params: {
  //       token: FINNHUB_API_TOKEN,
  //       exchange: 'AX',
  //       symbol: 'VAF.AX',
  //       resolution: 'D',
  //       from: new Date('2021.01.01').getTime() / 1000,
  //       to: new Date('2021.01.31').getTime() / 1000
  //     }
  //   })
  //     .then(response => {
  //       console.log(response);
  //       setCandleData(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // };

  useEffect(() => {
    getStockSymbols();
  }, []);

  const renderSymbolSelector = () => {
    return (
      <Grid item style={{ width: '100%'}}>
        <TextField select fullWidth displayEmpty id='SymbolSelector' label='Stock Symbol Selector' variant='outlined' value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.value)}>
        {symbolsData &&
          symbolsData.map((symbol, i) => {
            return <MenuItem key={i} value={symbol.symbol}>{symbol.symbol.slice(0, -3)}</MenuItem>;
          })}
      </TextField>
      </Grid>
    )
  } 

  return (
    <div className='App'>
      <header className='App-header'>
        {loading ? (
          <CircularProgress />
        ) : (
          <img src={logo} className='App-logo' alt='logo' />
        )}
        <Grid container xs={6} justify='center' alignItems='center' style={{ backgroundColor: '#FFF'}}>
          {symbolsData && renderSymbolSelector()}
        </Grid>
      </header>
      
    </div>
  );
}

export default App;
