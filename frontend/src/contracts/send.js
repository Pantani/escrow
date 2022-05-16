import Escrow from './Escrow.json';
import { web3 } from './web3Util.js';

const EscrowContract = new web3.eth.Contract(Escrow.abi);

const send = (escrowContractAddress, method, address) => {
  EscrowContract.options.address = escrowContractAddress;
  return EscrowContract.methods[method]().send({
    from: address
  })
}

export default send;

