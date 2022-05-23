const Web3 = require('web3');

const defaultHost = "http://localhost:8545"
const provider = window.ethereum ? window.ethereum.currentProvider : new Web3.providers.HttpProvider(defaultHost);

const web3 = new Web3(provider);

export {web3};

