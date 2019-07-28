import Web3 from 'web3';
import TOKEN_ABI from './contract';

const web3 = new Web3(
  'https://mainnet.infura.io/v3/6cae396f06e84c3abc9ddbdf0bbf084f'
);

export const tokenContract = tokenAddress =>
  new web3.eth.Contract(TOKEN_ABI, tokenAddress);

export default web3;
