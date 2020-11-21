import ethers, { addrBalContract } from './setup';

export const getBalances = async (tokenAddress, addresses) => {
  const addressList = generateAddresses([...new Set(addresses.split(/\s+/))]);

  for(const address of addressList){
    if(!ethers.utils.isAddress(address)){
      alert(`Invalid Address: ${address}`)
      return {result: {}, csvData: [["Address", "Balance"]]}
    }
  }
  try {
    let balances
  if(tokenAddress === '0x0000000000000000000000000000000000000000' || !tokenAddress){
    balances = await addrBalContract().getBalances(addressList)
  }else{
    balances = await addrBalContract().getTokenBalances(tokenAddress, addressList)
  }
  console.log(balances)
  return addressList.reduce((accummulator, address, index) => {
    accummulator.result[address] = (balances[index]).toString();
    accummulator.csvData.push([address, (balances[index]).toString()])
    return accummulator;
  }, {result: {}, csvData: [["Address", "Balance"]]});
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
