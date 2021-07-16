import axios from 'axios';

const API=axios.create({baseURL:'https://khissaria-cryptoboard.herokuapp.com/'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile'))
    {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    
    return req;
});

export const fetchTransaction=()=> API.get('/transaction');

export const AddTransaction=(newTransaction)=>API.post('/transaction',newTransaction);

export const getAssetsTransaction=()=>API.get('/transaction/getTransaction');

export const deleteTransaction=(id)=>API.delete(`/transaction/${id}`);

export const updateTransaction=(id,updatedTransaction)=>API.patch(`/transaction/${id}`,updatedTransaction);

export const signIn = (formData) => API.post('/users/signIn',formData);

export const signUp = (formData) => API.post('/users/signUp',formData);