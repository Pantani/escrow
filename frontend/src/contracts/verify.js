import Escrow from './Escrow.json';
import {web3} from './web3Util.js';

const EscrowContract = new web3.eth.Contract(Escrow.abi);

const call = (escrowContractAddress, method, address) => {
    EscrowContract.options.address = escrowContractAddress;
    return EscrowContract.methods[method]().call({
        from: address
    })
}
const buyer = (escrowContractAddress, address) => {
    return call(escrowContractAddress, 'buyer', address)
}
const seller = (escrowContractAddress, address) => {
    return call(escrowContractAddress, 'seller', address)
}
const startDate = (escrowContractAddress, address) => {
    return call(escrowContractAddress, 'startDate', address)
}
const buyDate = (escrowContractAddress, address) => {
    return call(escrowContractAddress, 'buyDate', address)
}
const getValue = (escrowContractAddress, address) => {
    return call(escrowContractAddress, 'getValue', address)
}
const balance = (escrowContractAddress, address) => {
    return call(escrowContractAddress, 'balance', address)
}
const buyerOk = (escrowContractAddress, address) => {
    return call(escrowContractAddress, 'buyerOk', address)
}
const sellerOk = (escrowContractAddress, address) => {
    return call(escrowContractAddress, 'sellerOk', address)
}

const getData = async (escrowContractAddress, address) => {
    return {
        buyer: await buyer(escrowContractAddress, address),
        seller: await seller(escrowContractAddress, address),
        startDate: await startDate(escrowContractAddress, address),
        buyDate: await buyDate(escrowContractAddress, address),
        value: await getValue(escrowContractAddress, address),
        balance: await balance(escrowContractAddress, address),
        buyerOk: await buyerOk(escrowContractAddress, address),
        sellerOk: await sellerOk(escrowContractAddress, address),
    }
}

export default getData;
