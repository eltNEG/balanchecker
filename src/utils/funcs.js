import web3, { tokenContract } from './setup';

export const getBalances = async (tokenAddress, addresses) => {
  let getBalance;
  const addressList = [...new Set(addresses.split(/\s+/))];
  if (tokenAddress) {
    getBalance = addr =>
      tokenContract(tokenAddress)
        .methods.balanceOf(addr)
        .call();
  } else {
    getBalance = web3.eth.getBalance;
  }
  const addressesPromise = addressList.map(address => {
    if (web3.utils.isAddress(address)) {
      return getBalance(address);
    }
    return 'invalid address';
  });
  const balances = await Promise.all(addressesPromise);
  return addressList.reduce((accummulator, address, index) => {
    accummulator.result[address] = balances[index];
    accummulator.csvData.push([address, balances[index]])
    return accummulator;
  }, {result: {}, csvData: [["Address", "Balance"]]});
};
