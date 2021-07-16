import mongoose from 'mongoose';

const transactionSchema=mongoose.Schema({
    coinID:String,
    quantity:Number,
    pricepercoin:Number,
    totalAmount:Number,
    transactionDate:Date,
    transactionType:Number,
    creator:String,
    createdAt:{
        type:Date,
        default:new Date()
    }

})

const transaction=mongoose.model('transaction',transactionSchema);
export default transaction;