import * as api from '../api'


export const getTransactions = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTransaction();
        dispatch({ type: 'FETCH_ALL', payload: data });
    }
    catch (err) {
        console.log(err);
    }
}

export const getAssetsTransaction = () => async (dispatch) => {
    try {
        const { data } = await api.getAssetsTransaction()
        dispatch({ type: 'GET_TRANSACTION', payload: data })

    }
    catch (err) {
        console.log(err);
    }
}

export const createTransaction = (transaction,history) => async (dispatch) => {

    try {
        const { data } = await api.AddTransaction(transaction);
        dispatch({ type: 'CREATE', payload: data });
        alert('Transaction Recorded Successfully');
        history.go('/home');
    }
    catch (err) {
        
        console.log(err);
    }

}

export const deleteTransaction = (id,history) => async (dispatch) => {
    try {
        
        await api.deleteTransaction(id);
        dispatch({ type: 'DELETE', payload: id })
        history.go(0);
    }
    catch (err) {
        console.log(err);
    }
}

export const updateTransaction = (id, transaction,history) => async (dispatch) => {

    try {
        const { data } = api.updateTransaction(id, transaction);
        dispatch({ type: 'UPDATE', payload: data });
        history.push('/assets');
    }
    catch (err) {
        console.log(err);
    }
}