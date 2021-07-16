import transaction from '../models/transaction.js';
import mongoose from 'mongoose';
import _, { map } from 'underscore';

export const getTransaction = async (req, resp) => {

    try {
        var data = [];
        var finalData = {
            coinID: '',
            totalValue: '',
            totalQuantity: '',
        };
        var buyData = {
            coinID: '',
            totalValue: '',
            totalQuantity: '',
        }
        var sellData = {
            coinID: '',
            totalValue: '',
            totalQuantity: '',
        }
        const transactions = await transaction.find({ creator: req.userId });
        var tran = _.groupBy(transactions, 'coinID');
        tran = Object.values(tran).reverse();
        tran.forEach(obj => {
            buyData.totalQuantity = sellData.totalQuantity = 0;
            buyData.totalValue = sellData.totalValue = 0;
            obj.forEach(childObj => {
                
                finalData.coinID = childObj.coinID;
                if (childObj.transactionType === 1) {
                    buyData.totalQuantity = buyData.totalQuantity + childObj.quantity;
                    buyData.totalValue = buyData.totalValue + childObj.totalAmount;
                }
                else if (childObj.transactionType === 2) {
                    sellData.totalQuantity = sellData.totalQuantity + childObj.quantity;
                    sellData.totalValue = sellData.totalValue + childObj.totalAmount;
                }

            })
            finalData.totalQuantity = buyData.totalQuantity - sellData.totalQuantity;
            finalData.totalValue = buyData.totalValue - sellData.totalValue;
            data.unshift(finalData);
            finalData = {
                coinID: '',
                totalValue: '',
                totalQuantity: '',
            };

        });
        resp.status(200).json(data);
    }
    catch (err) {
        console.log(err.message);
        resp.status(404).json({ message: err.message });
    }
}
export const createTransaction = (req, resp) => {
    
    const transactionBody = req.body;
    const amount = transactionBody.quantity * transactionBody.pricepercoin;
    const newTransaction = new transaction({ ...transactionBody, totalAmount: amount, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        newTransaction.save();
        resp.status(200).json(newTransaction);
    }
    catch (err) {
        resp.status(404).json({ message: err.message });
    }
}

export const getAssetsTransaction = async (req, resp) => {
    try {
        let transactions = await transaction.find({ creator: req.userId });
        resp.status(200).json(transactions);
    }
    catch (err) {
        resp.status(404).json({ message: err.message });
    }
}

export const updateTransaction = async (req, resp) => {
    const { id } = req.params;
    const transactionBody = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return resp.status(404).send('No transaction with such ID');
        transactionBody.totalAmount = transactionBody.quantity * transactionBody.pricepercoin;

        const updatedTransaction = await transaction.findByIdAndUpdate(id, transactionBody, { new: true });
        resp.json(updatedTransaction);
    }
    catch (err) {
        console.log(err.message);
        resp.status(404).json({ message: err.message });
    }
}

export const deleteTransaction = async (req, resp) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return resp.status(404).send('No transaction with such ID');

    await transaction.findByIdAndDelete(id);

    resp.json({ message: 'Transaction deleted successfully' });
}