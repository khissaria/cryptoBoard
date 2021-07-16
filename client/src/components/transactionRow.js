import React, { useEffect, useState } from 'react';

const TransactionRow = ({ transaction }) => {
    

    const [currentPrice, setCurrentPrice] = useState(0);
    const [dayChange, setDayChange] = useState(0);
    const url = "https://api.pro.coinbase.com";
    let returnDisplay, changeDisplay;
    if (getReturn((transaction.totalValue / transaction.totalQuantity).toFixed(4)) > 0) {
        returnDisplay = <span style={{ color: 'green' }}>{'$' + getReturn((transaction.totalValue / transaction.totalQuantity).toFixed(4))}</span>
    }
    else if (getReturn((transaction.totalValue / transaction.totalQuantity).toFixed(4)) < 0) {
        returnDisplay = <span style={{ color: 'red' }}>{'$' + getReturn((transaction.totalValue / transaction.totalQuantity).toFixed(4))}</span>
    }
    else {
        returnDisplay = <span>{'$' + getReturn((transaction.totalValue / transaction.totalQuantity).toFixed(4))}</span>
    }
    if (parseFloat(dayChange).toFixed(4) > 0) {
        changeDisplay = <span style={{ color: 'green' }}>{parseFloat(dayChange).toFixed(4) + '%'}</span>
    }
    else if (parseFloat(dayChange).toFixed(4) < 0) {
        changeDisplay = <span style={{ color: 'red' }}>{parseFloat(dayChange).toFixed(4) + '%'}</span>

    }
    else {
        changeDisplay = <span>{parseFloat(dayChange).toFixed(4) + '%'}</span>
    }

    useEffect(() => {
        let tickerData = `${url}/products/${transaction.coinID}/ticker`;
        let dataArr = [];
        const fetchTickerData = async () => {

            await fetch(tickerData)
                .then((res) => res.json())
                .then((data) => (dataArr = data));
            setCurrentPrice(dataArr.price);
        }
        fetchTickerData();

    }, [transaction])

    useEffect(() => {

        let statData = `${url}/products/${transaction.coinID}/stats`;
        let dataArr = [];
        const fetchStats = async () => {
            await fetch(statData)
                .then((res) => res.json())
                .then((data) => (dataArr = data));
            setDayChange(((dataArr.last - dataArr.open) / dataArr.open) * 100);
        }
        fetchStats();
    }, [transaction])

    function getReturn(investedAmount) {
        return (((parseFloat(currentPrice).toFixed(2) - investedAmount).toFixed(3) * transaction.totalQuantity).toFixed(2))
    }
    if (transaction.totalQuantity !== 0) {
        return (

            <tr key={transaction.coinID}>

                <td className="column1">{transaction.coinID}</td>
                <td className="column2">{'$' + (transaction.totalValue / transaction.totalQuantity).toFixed(4)}</td>
                <td className="column3">{transaction.totalQuantity}</td>
                <td className="column4">{'$' + transaction.totalValue.toFixed(4)}</td>
                <td className="column5">{'$' + parseFloat(currentPrice).toFixed(4)}</td>
                <td className="column5">{returnDisplay}</td>
                <td className="column6">{changeDisplay}</td>

            </tr>
        )
    }
    else{
        return('');
    }
}

export default TransactionRow;