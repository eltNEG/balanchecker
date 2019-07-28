import web3, {tokenContract} from './setup';


export const getBalances = async(tokenAddress, addresses) => {
    let getBalance
    const addressList = [...(new Set(addresses.split(" ")))]
    if(tokenAddress){
        getBalance = (addr) => tokenContract(tokenAddress).methods.balanceOf(addr).call()
        
    }else{
        getBalance = web3.eth.getBalance;
    }
  const addressesPromise = addressList.map(address => {
    if(web3.utils.isAddress(address)){
        return getBalance(address);
    }
    return 'invalid address';
  });
  const balances = await Promise.all(addressesPromise)
  return addressList.reduce((result, address, index) => {
      result[address] = balances[index]
      return result
  }, {})
};

// web3.eth.net.getNetworkType().then(console.log).catch(err => console.log('err =>', err));


