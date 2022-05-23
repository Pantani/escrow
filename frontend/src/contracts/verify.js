import Escrow from './Escrow.json';
import {web3} from './web3Util.js';

const EscrowContract = new web3.eth.Contract(Escrow.abi);

const buyer = (escrowContractAddress) => {
    EscrowContract.options.address = escrowContractAddress;
    return EscrowContract.methods.buyer().call()
}
const seller = (escrowContractAddress, address) => {
    EscrowContract.options.address = escrowContractAddress;
    return EscrowContract.methods.seller().call()
}
const startDate = (escrowContractAddress, address) => {
    EscrowContract.options.address = escrowContractAddress;
    return EscrowContract.methods.startDate().call()
}
const buyDate = (escrowContractAddress, address) => {
    EscrowContract.options.address = escrowContractAddress;
    return EscrowContract.methods.buyDate().call()
}
const getValue = (escrowContractAddress, address) => {
    EscrowContract.options.address = escrowContractAddress;
    return EscrowContract.methods.getValue().call()
}
const balance = (escrowContractAddress, address) => {
    EscrowContract.options.address = escrowContractAddress;
    return EscrowContract.methods.balance().call()
}
const buyerOk = (escrowContractAddress, address) => {
    EscrowContract.options.address = escrowContractAddress;
    return EscrowContract.methods.buyerOk().call()
}
const sellerOk = (escrowContractAddress, address) => {
    EscrowContract.options.address = escrowContractAddress;
    return EscrowContract.methods.sellerOk().call()
}
const trackNumber = (escrowContractAddress, address) => {
    EscrowContract.options.address = escrowContractAddress;
    return EscrowContract.methods.trackNumber().call()
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
        trackNumber: await trackNumber(escrowContractAddress, address),
    }
}

export default getData;
