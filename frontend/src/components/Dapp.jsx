import React, {Component} from 'react';
import Web3 from 'web3';
import Actions from './Actions';
import Deployment from './Deployment';
import Verify from './Verify';
import {NoWalletDetected} from "./NoWalletDetected";
import {ConnectWallet} from "./ConnectWallet";

class Dapp extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            selectedAddress: undefined,
        };
        this.state = this.initialState;
    }

    resetState() {
        this.setState(this.initialState);
    }

    async connectWallet() {
        const [selectedAddress] = await window.ethereum.request({method: 'eth_requestAccounts'});

        this.initialize(selectedAddress);

        window.ethereum.on("accountsChanged", ([newAddress]) => {
            if (newAddress === undefined) {
                return this.resetState();
            }
            this.initialize(newAddress);
        });
        window.ethereum.on("chainChanged", () => {
            this.resetState();
        });
    }

    initialize(userAddress) {
        this.setState({
            selectedAddress: userAddress,
        });
        this.initializeWeb3();
    }

    async initializeWeb3() {
        const provider = window.ethereum.currentProvider;
        this.provider = new Web3(provider);
    }

    render() {
        if (window.ethereum === undefined) {
            return <NoWalletDetected/>;
        }

        if (!this.state.selectedAddress) {
            return (
                <ConnectWallet
                    connectWallet={() => this.connectWallet()}
                />
            );
        }

        return (
            <React.Fragment>
                <Deployment/>
                <Verify/>
                <Actions/>
            </React.Fragment>
        );
    }
}

export default Dapp;
