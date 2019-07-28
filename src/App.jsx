import React, { useState } from 'react';
import { TextArea, Button, Input, Form } from 'semantic-ui-react';
import { getBalances } from './utils/funcs';
import 'semantic-ui-css/semantic.min.css';
import './assets/style.css';


const initialState = {
  tokenAddress: '',
  addresses: '',
  result: {}
};
function App() {
  const [state, setState] = useState(initialState);
  const { tokenAddress, addresses, result } = state;
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
        <Input autoComplete="off" onChange={handleChange} name="tokenAddress" value={tokenAddress} placeholder="Token address" />
        <TextArea onChange={handleChange} name="addresses" value={addresses} placeholder="Paste your ethereum addresses here" />
        <Button onClick={() => getBalances(tokenAddress, addresses).then((result) => {
          setState(prevState => ({...prevState, result}))
        })}>Check balance</Button>
        <TextArea value={JSON.stringify(result)} onChange={handleChange} placeholder="Results" />
        <Button>Download CSV</Button>
        </Form>
        
      </main>
    </div>
  );
}

export default App;
