import React, { useEffect, useState } from 'react';
import Dashboard from './dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../actions/transaction';
import TransactionRow from './transactionRow';
import LoginNavbar from './LoginNavbar';
import '../style/home.css'
import { formatData } from '../util';
import '../style/dashboard.css'
import decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';


const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const history = useHistory();
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/');
    }

    useEffect(() => {

        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime())
                logout();
            setUser(JSON.parse(localStorage.getItem('profile')));

        }
        else {
            history.push('/');
        }
    }, []);

    const dispatch = useDispatch();
    const [viewType, setViewType] = useState(false);
    let sliderPosition;
    const handleClick = (e) => {

        e.preventDefault();
        if (e.target.id === 'spanStatistics') {
            setViewType(true);
        }
        else {
            setViewType(false)
        }
    }
    if (viewType) {
        sliderPosition = <div className="slider" style={{ width: '86px', height: '40px', left: '17px', top: '3px' }}></div>
    }
    else {
        sliderPosition = <div className="slider" style={{ width: '86px', height: '40px', left: '119px', top: '3px' }}></div>
    }

    <div className="slider" style={{ width: '86px', height: '40px', left: '113px', top: '3px' }}></div>

    useEffect(() => { dispatch(getTransactions()); }, [dispatch]);
    const userTransactions = useSelector((state) => state.transactions);
    let formattedData = formatData(userTransactions);
    return (
        <>
            <LoginNavbar />
            <div display="block,flex" className="sc-16r8icm-0 iYgGPm">
                <div className="iazzsz-0 cVJmRr ButtonSwitcher">
                    {sliderPosition}
                    <button className="x0o17e-0 DChGS iazzsz-1 jCFojM  landed" id='btnStatistics' onClick={handleClick}>
                        <span style={{ fontSize: '12px', fontWeight: 600 }} id='spanStatistics'>Dashboard</span>
                    </button>
                    <button className="x0o17e-0 DChGS iazzsz-1 jCFojM  landed" id='btnHoldings' onClick={handleClick}>
                        <span style={{ fontSize: '12px', fontWeight: 600 }} id='spanHoldings'>Holdings</span>
                    </button>
                </div>
            </div>
            {!viewType ? <div display="flex" className="sc-16r8icm-0 itgTOw">
                <a className="x0o17e-0 jqmWCc" href='/transaction' style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <span className="x0o17e-1 bHCvsh">
                        <img src="https://s2.coinmarketcap.com/static/cloud/img/portfolio/circle_plus.svg?_=08a5e60" alt='add' style={{ marginTop: '3px' }} />
                    </span>Add New</a>
                <a className="x0o17e-0 jqmWCc" href='/assets' style={{ textDecoration: 'none', cursor: 'pointer', marginLeft: '1rem' }}>
                    <span className="x0o17e-1 bHCvsh">
                    </span>View Transactions</a>

            </div> : ''}
            {viewType ? <Dashboard price={formattedData} /> : <div className="limiter">
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            <table>
                                <thead>
                                    <tr className="table100-head">
                                        <th className="column1">Name</th>
                                        <th className="column2">Average Price</th>
                                        <th className="column3">Holdings</th>
                                        <th className="column4">Total Investment</th>
                                        <th className="column5">Current Price</th>
                                        <th className="column5">Profit/Loss</th>
                                        <th className="column6">24H Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userTransactions.length !== 0 ?
                                        userTransactions.map((current) => (
                                            <TransactionRow transaction={current} key={current.coinID} />
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
            </div>}


        </>
    )

}

export default Home;