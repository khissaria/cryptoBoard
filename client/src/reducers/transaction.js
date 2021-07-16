import { FETCH_ALL, CREATE, CURRENCY, GET_TRANSACTION } from "../constants/actionType";

const reducer = (transactions = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case GET_TRANSACTION:
            return action.payload;
        case CREATE:
            return [...transactions, action.payload];
        case CURRENCY:
            return action.payload;
        default: return transactions;
    }
}

export default reducer;