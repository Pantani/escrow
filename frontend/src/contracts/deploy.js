import Escrow from './Escrow.json';
import {web3} from './web3Util.js';

const EscrowContract = new web3.eth.Contract(Escrow.abi);

const deploy = (value, depositorAddress) => {
    const deployParameters = {
        arguments: [value],
        data: Escrow.bytecode,
    }
    return EscrowContract.deploy(deployParameters).estimateGas().then((gas) => {
        return EscrowContract.deploy(deployParameters).send({
            from: depositorAddress,
            gas
        });
    })
}

export default deploy;
