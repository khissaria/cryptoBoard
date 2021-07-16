import React, { useState, useEffect } from 'react';
import { getAssetsTransaction } from '../actions/transaction';
import { useDispatch, useSelector } from 'react-redux';
import { AssetTransactionRow } from './assetTransactionRow';
import LoginNavbar from './LoginNavbar';

export const AssetTransactions = () => {

    const dispatch = useDispatch();

    useEffect(() => { dispatch(getAssetsTransaction()); }, [dispatch]);
    const userTransactions = useSelector((state) => state.transactions);
   
    return (<>
        <LoginNavbar />
        <div className="limiter">
            <div className="container-table100">
                <div className="wrap-table100">
                    <div className="table100">
                        <table className='tr-assets'>
                            <thead>
                                <tr className="table100-head">
                                    <th className="column1">Asset Name</th>
                                    <th className="column2">Price</th>
                                    <th className="column3">Amount</th>
                                    <th className="column4">Total Value</th>
                                    <th className="column5">Date</th>
                                    <th className="column5">Type</th>
                                    <th className="column6">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userTransactions.length!==0 ? userTransactions.map((current) => (
                                        <AssetTransactionRow transaction={current} key={current._id} />
                                    )) :
                                        <tr >
                                            <td className="column1" rowSpan='6'>No Data to display</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}