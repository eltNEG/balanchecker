import React, { useState } from 'react';
import { TextArea, Button, Input, Form } from 'semantic-ui-react';
import { CSVLink } from 'react-csv';
import { getBalances } from './utils/funcs';
import 'semantic-ui-css/semantic.min.css';
import './assets/style.css';

const initialState = {
  tokenAddress: '',
  addresses: '',
  result: {},
  csvData: []
};
function App() {
  const [state, setState] = useState(initialState);
  const { tokenAddress, addresses, result, csvData } = state;
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <div className="App">
      <header className="App-header">Balanchecker</header>
      <main>
        <Form autoComplete="off">
          <Input
            autoComplete="off"
            onChange={handleChange}
            name="tokenAddress"
            value={tokenAddress}
            placeholder="Token address"
          />
          <TextArea
            onChange={handleChange}
            name="addresses"
            value={addresses}
            placeholder="Paste your ethereum addresses here"
          />
          <Button
            onClick={() =>
              getBalances(tokenAddress, addresses).then(
                ({ result, csvData }) => {
                  setState(prevState => ({ ...prevState, result, csvData }));
                }
              )
            }
          >
            Check balance
          </Button>
          <TextArea
            value={JSON.stringify(result)}
            onChange={handleChange}
            placeholder="Results"
          />

          {csvData.length ? (
            <CSVLink filename="data.csv" data={csvData}>
              Download CSV
            </CSVLink>
          ) : null}
        </Form>
      </main>
    </div>
  );
}

export default App;
