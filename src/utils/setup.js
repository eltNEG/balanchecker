import {ethers, Contract} from 'ethers'
import TOKEN_ABI from './contract';
import ADDR_BAl_ABI from './addrBalContract';

export const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/b423eaa8379d4c0aa17c1d85dd24cf24"
);

export const tokenContract = tokenAddress =>
  new Contract(tokenAddress, TOKEN_ABI);

export const addrBalContract = () =>
  new Contract("0x5144834afcc082e02996074CE0136c0682713230", ADDR_BAl_ABI, provider);

export default ethers;
