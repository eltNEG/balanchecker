import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { getBalances } from './utils/funcs';
import './assets/style.css';
import './assets/App.scss';
import Card from './components/Card';
import Line from './components/Line';
import Header from './components/Header';
import Tab from './components/Tab';

const initialState = {
  tokenAddress: '',
  addresses: '',
  result: {},
  csvData: []
};
function App() {
  const [state, setState] = useState(initialState);
  const { tokenAddress, addresses, result, csvData } = state;
  const [coin, setCoin] = useState('Ethereum');
  const [ani, setAni] = useState({ current: coin, use: '' });
  const { use, current } = ani;
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };
  const isEthereum = coin === 'Ethereum';

  if (!use) {
    setTimeout(() => setAni({ ...ani, use: current }), 100);
  } else {
    if (use && coin !== current) {
      setAni({ current: coin, use: '' });
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    getBalances(tokenAddress, addresses).then(({ result, csvData }) => {
      setState(prevState => ({ ...prevState, result, csvData }));
    });
  };
  return (
    <div className="app content">
      <Line lineNumber="line-1" />
      <Line lineNumber="line-2" />
      <Line lineNumber="line-3" />
      <Header className="App-header" text="Balanchecker" />
      <Card>
        <Tab handleClick={coin => setCoin(coin)} />
        <form className="form" autoComplete="offthis" onSubmit={handleSubmit}>
          <input type="hidden" value="prayer" />
          <label for="addr">Token Address</label>
          <input
            id="addr"
            className={use}
            autoComplete="ohohff"
            onChange={handleChange}
            name="tokenAddress"
            disabled={isEthereum}
            value={
              isEthereum
                ? '0x0000000000000000000000000000000000000000'
                : tokenAddress
            }
            placeholder="Token address"
          />
          <label for="addresses">Ethereum Addresses</label>
          <textarea
            id="addresses"
            onChange={handleChange}
            name="addresses"
            value={addresses}
            placeholder="Paste your ethereum addresses here"
          />
          <button type="submit">Check balance</button>
          <label for="result">Result</label>
          <textarea
            id="result"
            value={JSON.stringify(result)}
            onChange={handleChange}
            placeholder="Results"
            disabled={true}
          />

          {csvData.length ? (
            <CSVLink filename="data.csv" data={csvData}>
              Download CSV
            </CSVLink>
          ) : null}
        </form>
      </Card>
    </div>
  );
}

export default App;
