import React, {Component} from 'react';
import send from '../contracts/send';
import {web3} from "../contracts/web3Util";

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            escrowAddress: '',
            transactions: [],
        }
        this.sendTx = this.sendTx.bind(this);
        this.buy = this.buy.bind(this);
        this.confirmProduct = this.confirmProduct.bind(this);
        this.sendProduct = this.sendProduct.bind(this);
        this.refund = this.refund.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    buy() {
        this.sendTx('buy')
    }
    confirmProduct() {
        this.sendTx('confirmProduct')
    }
    sendProduct() {
        this.sendTx('sendProduct')
    }
    refund() {
        this.sendTx('refund')
    }

    sendTx(method) {
        const {escrowAddress} = this.state;
        if (web3) {
            web3.eth.getAccounts().then((accounts) => {
                let account = accounts[0];
                if (account) {
                    send(escrowAddress, method, account).then(() => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Action ${method} successful for Escrow at ${escrowAddress}.`)
                        });
                    }).catch((err) => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Action ${method} unsuccessful for Escrow at ${escrowAddress}.`)
                        });
                        alert(err);
                    });
                }
            })
        }
    }

    handleChange(prop) {
        return ({target}) => this.setState({[prop]: target.value});
    }

    render() {
        const {escrowAddress, transactions} = this.state;
        return (
            <div className="container py-3 px-4 my-3 border">
                <h1> Approve Function </h1>
                <p className="font-weight-light">
                    This is the function the arbiter make actions in the contract.
                </p>
                <form>
                    <div className="form-group">
                        <label htmlFor="beneficiary">Escrow Address
                            <input type="text" className="form-control" id="escrow" placeholder="Contract Address"
                                   value={escrowAddress} onChange={this.handleChange('escrowAddress')}/>
                        </label>
                    </div>
                    <div className="btn btn-primary m-sm-1" onClick={this.buy}>Buy</div>
                    <div className="btn btn-primary m-sm-1" onClick={this.confirmProduct}>Confirm Product</div>
                    <div className="btn btn-primary m-sm-1" onClick={this.sendProduct}>Send Product</div>
                    <div className="btn btn-primary m-sm-1" onClick={this.refund}>Refund</div>
                </form>
                <ul className="list-group py-2">
                    {
                        transactions.map(tx => {
                            return (
                                <li className="alert alert-info" key={tx}>
                                    {tx}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Actions;
