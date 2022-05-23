import React, {Component} from 'react';
import {buy} from '../contracts/send';

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAddress: this.props.selectedAddress,
            escrowAddress: '',
            buyValue: 0,
            addMoreValue: 0,
            newValue: 0,
            transactions: [],
        }
        this.buy = this.buy.bind(this);
        this.confirmProduct = this.confirmProduct.bind(this);
        this.sendProduct = this.sendProduct.bind(this);
        this.refund = this.refund.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    buy() {
        const {escrowAddress, selectedAddress, buyValue} = this.state;
        buy(escrowAddress, selectedAddress, buyValue).then((receipt) => {
            this.setState({
                transactions: this.state.transactions.concat(`Buy successful at ${receipt.hash}.`)
            });
        }).catch((err) => {
            this.setState({
                transactions: this.state.transactions.concat(`Buy unsuccessful for Escrow at ${escrowAddress}: ${err.message}`)
            });
        });
    }

    changeValue() {
    }

    addMoreBalance() {
    }

    confirmProduct() {
    }

    sendProduct() {
    }

    paySeller() {
    }

    refund() {
    }

    handleChange(prop) {
        return ({target}) => this.setState({[prop]: target.value});
    }

    render() {
        const {buyValue, addMoreValue, newValue, escrowAddress, transactions} = this.state;
        return (
            <div className="container py-3 px-4 my-3 border">
                <h1> Escrow Actions </h1>
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
                    <div className="form-group">
                        <label htmlFor="beneficiary">Change Escrow Value:
                            <input type="number" className="form-control" id="changeValue" placeholder="Value"
                                   value={newValue} onChange={this.handleChange('changeValue')}/>
                        </label>
                        <div className="btn btn-primary m-sm-1" onClick={this.changeValue}>Change Value</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="beneficiary">Buy:
                            <input type="number" className="form-control" id="buyValue" placeholder="Value"
                                   value={buyValue} onChange={this.handleChange('buyValue')}/>
                        </label>
                        <div className="btn btn-primary m-sm-1" onClick={this.buy}>Buy</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="beneficiary">Add More Balance:
                            <input type="number" className="form-control" id="addMoreBalance" placeholder="Value"
                                   value={addMoreValue} onChange={this.handleChange('addMoreBalance')}/>
                        </label>
                        <div className="btn btn-primary m-sm-1" onClick={this.addMoreBalance}>Add More Balance</div>
                    </div>
                    <div className="btn btn-primary m-sm-1" onClick={this.sendProduct}>Send Product</div>
                    <div className="btn btn-primary m-sm-1" onClick={this.confirmProduct}>Confirm Product</div>
                    <div className="btn btn-primary m-sm-1" onClick={this.paySeller}>Pay Seller</div>
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
