import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { createTransaction } from '../actions/transaction';
import LoginNavbar from './LoginNavbar';
import '../style/transaction.css'
import { useHistory } from 'react-router';


const Transaction = () => {
    const history = useHistory({ forceRefresh: true });
    var date = new Date();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;

    }
    var todaysDate = date.getDate();
    if (todaysDate < 10) {
        todaysDate = '0' + todaysDate;
    }
    var formatedDate = `${date.getFullYear()}-${month}-${todaysDate}`;
    const [source, setSource] = useState(null);
    const dispatch = useDispatch();
   
    const [transactionData, setTransactionData] = useState({
        coinID: '',
        quantity: '',
        pricepercoin: '',
        transactionDate: formatedDate,
        transactionType: '',
        totalAmount: ''
    });


    const [currencies, setcurrencies] = useState([]);
    const [pair, setpair] = useState("");
    const [price, setprice] = useState("0.00");
    const ws = useRef(null);




    let first = useRef(false);
    const url = "https://api.pro.coinbase.com";

    useEffect(() => {
       
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
        let pairs = [];

        const apiCall = async () => {

            await fetch(url + "/products")
                .then((res) => res.json())
                .then((data) => (pairs = data));

            let filtered = pairs.filter((pair) => {
                if (pair.quote_currency === "USD") {

                    return pair;
                }
            });

            filtered = filtered.sort((a, b) => {
                if (a.base_currency < b.base_currency) {
                    return -1;
                }
                if (a.base_currency > b.base_currency) {
                    return 1;
                }
                return 0;
            });


            setcurrencies(filtered);

            first.current = true;
        };

        apiCall();
    }, []);

    useEffect(() => {
        if (!first.current) {

            return;
        }


        let msg = {
            type: "subscribe",
            product_ids: [pair],
            channels: ["ticker"]
        };
        let jsonMsg = JSON.stringify(msg);
        ws.current.send(jsonMsg);

        let tickerData = `${url}/products/${pair}/ticker`;
        const fetchTickerData = async () => {
            let dataArr = [];
            await fetch(tickerData)
                .then((res) => res.json())
                .then((data) => (dataArr = data));


            setTransactionData({ ...transactionData, pricepercoin: dataArr.price })
        };

        fetchTickerData();

        ws.current.onmessage = (e) => {
            let data = JSON.parse(e.data);

            if (data.type !== "ticker") {
                return;
            }

            if (data.product_id === pair) {
                setprice(data.price);
            }
        };
    }, [pair]);

    const handleQuantityChange = (e) => {

        setTransactionData({ ...transactionData, quantity: e.target.value })

    }

    const handleSelect = (e) => {

        let unsubMsg = {
            type: "unsubscribe",
            product_ids: [pair],
            channels: ["ticker"]
        };
        let unsub = JSON.stringify(unsubMsg);

        ws.current.send(unsub);

        setpair(e.target.value);
        setTransactionData({ ...transactionData, coinID: e.target.value });

    };

    function handleSubmit(e) {
        e.preventDefault();
        
        const amount = transactionData.quantity * transactionData.pricepercoin;
        setTransactionData({ ...transactionData, totalAmount: amount });


        if (transactionData.transactionType === null || transactionData.transactionType === "") {
            alert('Select Transaction Type')
            e.preventDefault();
        }
        else {
            dispatch(createTransaction(transactionData,history));
            
        }
    }
    function handleSourceChange(e) {

        const transactionSource = e.currentTarget.id;

        if (transactionSource === 'btnBuy') {
            setTransactionData({ ...transactionData, transactionType: 1 });
        }
        if (transactionSource === 'btnSell') {
            setTransactionData({ ...transactionData, transactionType: 2 });

        }

    }
    return (<>
        <LoginNavbar />

        <div className='form-container'>
            <h3 className='heading'>Add Transaction</h3>
            <div className='button-container'>
                <button className='btn' style={{ margin: '0.5rem', borderRadius: '8px' }} id='btnBuy' onClick={handleSourceChange}>Buy</button>
                <button className='btn' style={{ margin: '0.5rem', borderRadius: '8px' }} id='btnSell' onClick={handleSourceChange}>Sell</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className='form-column'>
                        <p className="label-heading">Asset Name</p>
                        <select name="coinName" id="coinName" style={{ marginLeft: '-4%', height: '38px' }} onChange={handleSelect}>
                            {currencies.map((cur, idx) => {
                                return (
                                    <option key={idx} value={cur.id}>
                                        {cur.display_name}
                                    </option>
                                );
                            })}
                        </select>
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
                        <input required type="date" defaultValue={formatedDate} id="txtDate" className="form-control" value={transactionData.date} onChange={(e) => setTransactionData({ ...transactionData, transactionDate: e.target.value })} />
                    </div>
                </div>
                <div className="form-row">
                    <div className='form-column' style={{ width: '100%' }}>
                        <p className="label-heading">Total Amount</p>
                        <input disabled className='form-control totalamount' step='2' required type="text" min='0.1' value={'$' + (transactionData.quantity * transactionData.pricepercoin)} id="txtAmount" onChange={(e) => setTransactionData({ ...transactionData, totalAmount: e.target.value })} />
                    </div>
                </div>
                <hr className="my-4" style={{ width: '100%' }}></hr>
                <button disabled="" type="submit" className="btn btn-primary btn-add">Add Transaction</button>
            </form>
        </div></>
    )
}

export default Transaction;