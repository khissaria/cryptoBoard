import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router';
import LoginNavbar from './LoginNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { updateTransaction } from '../actions/transaction';


export const EditTransaction = () => {
    const history = useHistory({ forceRefresh: true });

    const [transactionData, setTransactionData] = useState({
        id: '',
        coinID: '',
        quantity: '',
        pricepercoin: '',
        transactionDate: '',
        transactionType: '',
        totalAmount: ''
    });
    const { state } = useLocation();

    debugger;
    const dispatch = useDispatch();

    useEffect(() => {


        if (state.transactionData) {
            setTransactionData({ ...transactionData, coinID: state.transactionData.coinID, pricepercoin: state.transactionData.pricepercoin, quantity: state.transactionData.quantity, transactionDate: state.transactionData.transactionDate.split('T')[0], id: state.transactionData._id, transactionType: state.transactionData.transactionType })
        }

    }, [state.transactionData]);


    const handleQuantityChange = (e) => {

        setTransactionData({ ...transactionData, quantity: e.target.value })

    }

    function handleSubmit(e) {
        e.preventDefault();

        const amount = transactionData.quantity * transactionData.pricepercoin;
        setTransactionData({ ...transactionData, totalAmount: amount });


        if (transactionData.transactionType === null || transactionData.transactionType === "") {
            alert('Select Transaction Type')
            e.preventDefault();
        }
        else {
            dispatch(updateTransaction(transactionData.id, transactionData, history));
            alert('Transaction updated Successfully');

        }
    }

    return (
        <>
            <LoginNavbar />

            <div className='form-container'>
                <h3 className='heading'>Edit Transaction</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className='form-column'>
                            <p className="label-heading">Asset Name</p>
                            <input readOnly required type="text" step='any' value={state.transactionData ? state.transactionData.coinID : ''} id="txtCoinID" className="form-control" />

                        </div>
                        <div className='form-column'>
                            <p className="label-heading">Quantity</p>
                            <input placeholder="Quantity" required type="number" step='any' value={transactionData.quantity} id="txtQuantity" className="form-control" onChange={handleQuantityChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className='form-column'>
                            <p className="label-heading">Price per coin</p>
                            <input placeholder='Price per Coin' required type="number" step='any' min='0.1' value={transactionData.pricepercoin} id="txtAmount" className="form-control" onChange={(e) => setTransactionData({ ...transactionData, pricepercoin: e.target.value })} />
                        </div>
                        <div className='form-column'>
                            <p className="label-heading">Transaction Data</p>
                            <input required type="date" defaultValue={state.transactionData ? state.transactionData.transactionDate.split('T')[0] : ''} id="txtDate" className="form-control" value={transactionData.date} onChange={(e) => setTransactionData({ ...transactionData, transactionDate: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className='form-column' style={{ width: '100%' }}>
                            <p className="label-heading">Total Amount</p>
                            <input disabled className='form-control totalamount' step='2' required type="text" min='0.1' value={'$' + (transactionData.quantity * transactionData.pricepercoin)} id="txtAmount" onChange={(e) => setTransactionData({ ...transactionData, totalAmount: e.target.value })} />
                        </div>
                    </div>
                    <hr className="my-4" style={{ width: '100%' }}></hr>
                    <button disabled="" type="submit" className="btn btn-primary btn-add">Update Transaction</button>
                </form>
            </div></>)
}