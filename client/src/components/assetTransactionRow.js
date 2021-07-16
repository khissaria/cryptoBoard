import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../actions/transaction';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';



export const AssetTransactionRow = ({ transaction }) => {
    const history = useHistory({ forceRefresh: true });
    const dispatch = useDispatch();

    function handleEditClick(e) {
        e.preventDefault();
        this.context.router.push({
            pathname: transaction,
            state: { transactionData: transaction }
        })

    }

    function handleDeleteClick(e) {
        e.preventDefault();
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure to delete the transaction?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(deleteTransaction(transaction._id, history))
                        alert('Transaction deleted successfully');

                    }
                },
                {
                    label: 'No',
                    onClick: () => ''
                }
            ]
        });
    }
    let returnDisplay;
    if (transaction.transactionType === 1) {
        returnDisplay = <span style={{ color: 'green' }}>Buy</span>
    }
    else {
        returnDisplay = <span style={{ color: 'red' }}>Sell</span>
    }

    return (

        <tr key={transaction.coinID}>

            <td className="column1">{transaction.coinID}</td>
            <td className="column2">{'$' + (transaction.pricepercoin).toFixed(4)}</td>
            <td className="column3">{transaction.quantity}</td>
            <td className="column4">{'$' + (transaction.pricepercoin * transaction.quantity).toFixed(4)}</td>
            <td className="column5">{transaction.transactionDate.split('T')[0]}</td>
            <td className="column5">{returnDisplay}</td>
            <td className="column6">


                <Link to={{ pathname: '/editTransaction', state: { transactionData: transaction } }} className="x0o17e-0 iOedBp sc-7pvt85-0 igsfhy" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(13, 110, 253)" height="16px" width="16" viewBox="0 0 24 24" color="neutral4" className="sc-16r8icm-0 loxzJB">
                        <path d="M20.7604 6.51232L17.4876 3.23956C17.3341 3.08617 17.1261 3 16.9091 3C16.6921 3 16.4841 3.08617 16.3306 3.23956L14.0453 5.52476L18.4752 9.95445L20.7604 7.66924C20.9138 7.51581 21 7.30774 21 7.09078C21 6.87383 20.9138 6.66575 20.7604 6.51232Z"></path>
                        <path d="M12.8883 6.68165L4.87555 14.6942C4.78589 14.7841 4.71838 14.8936 4.67836 15.0141L3.04193 19.9233C3.00098 20.0462 2.98982 20.1771 3.00936 20.3052C3.0289 20.4333 3.07858 20.5549 3.15432 20.66C3.23006 20.7652 3.32969 20.8508 3.445 20.9099C3.56031 20.969 3.68802 20.9999 3.81759 21C3.90552 21 3.99286 20.9856 4.07615 20.9575L8.98545 19.3211C9.10594 19.2811 9.21547 19.2135 9.30537 19.1239L17.3182 11.1113L12.8883 6.68165Z"></path></svg>
                </Link>
                <button className="x0o17e-0 iOedBp sc-7pvt85-0 igsfhy" onClick={handleDeleteClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="16px" width="16" viewBox="0 0 24 24" color="red" className="sc-16r8icm-0 loxzJB">
                        <path d="M18.5455 9.54545L17.8361 19.4798C17.8067 19.8927 17.622 20.279 17.3191 20.5611C17.0162 20.8432 16.6177 21 16.2038 21H7.79618C7.3823 21 6.98378 20.8432 6.68091 20.5611C6.37803 20.279 6.1933 19.8927 6.16391 19.4798L5.45455 9.54545M3 6.27273H21M8.72727 6.27273V3.81818C8.72727 3.60119 8.81347 3.39308 8.96691 3.23964C9.12035 3.0862 9.32846 3 9.54545 3H14.4545C14.6715 3 14.8796 3.0862 15.0331 3.23964C15.1865 3.39308 15.2727 3.60119 15.2727 3.81818V6.27273" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>

            </td>




        </tr>
    )
}