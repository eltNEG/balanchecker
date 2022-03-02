import ethers, { addrBalContract } from './setup';

export const getBalances = async (tokenAddress, addresses) => {
  const addressList = generateAddresses([...new Set(addresses.split(/\s+/))]);

  const invalidAddresses = []
  const validAddresses = []
  for(const address of addressList){
    if(ethers.utils.isAddress(address)){
      validAddresses.push(address)
    } else {
      invalidAddresses.push(address)
    }
  }
  try {
    let balances
    if(tokenAddress === '0x0000000000000000000000000000000000000000' || !tokenAddress){
      balances = await addrBalContract().getBalances(validAddresses)
    }else{
      balances = await addrBalContract().getTokenBalances(tokenAddress, validAddresses)
    }
    console.log(balances)
    let results = validAddresses.reduce((accummulator, address, index) => {
      accummulator.result[address] = (balances[index]).toString();
      accummulator.csvData.push([address, (balances[index]).toString()])
      return accummulator;
    }, {result: {}, csvData: [["Address", "Balance"]]});
    if (invalidAddresses.length > 0) {
      alert(`Invalid Addresses:\n ${invalidAddresses.join('\n')}`)
    }

    // include invalid addresses at the bottom
    results = invalidAddresses.reduce((accummulator, address) => {
      accummulator.result[address] = 'invalid address';
      accummulator.csvData.push([address, 'invalid address']);
      return accummulator;
    }, results);
    return results;
  } catch (error) {
    console.log(error)
    return {result: {}, csvData: [["Address", "Balance"]]} 
  }
}

const generateAddresses = (pubkeyList=[]) => {
  if(!pubkeyList[0].toLowerCase().startsWith("xpub")){
    return pubkeyList
  }
  const child = ethers.utils.HDNode.fromExtendedKey(pubkeyList[0])
  let n = 0
  let end = 99
  let pubkeyListGen = []
  if(pubkeyList.length === 2){
    end = Number(pubkeyList[1]) - 1
  }
  
  if(pubkeyList.length === 3){
    n = Number(pubkeyList[1])
    end = Number(pubkeyList[2])
  }
  while(n<=end){
    pubkeyListGen.push(child.derivePath(`0/${n}`).address)
    n++
  }
  return pubkeyListGen
}
