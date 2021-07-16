import { AUTH } from "../constants/actionType";
import * as api from '../api/index.js';

export const signIn = (formData, history) => async (dispatch) => {
    try {

        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        history.push('/home');
    }
    catch (err) {
        console.log(err.message);
    }
}

export const signUp=(formData,history)=>async (dispatch)=>{
    try{
        await api.signUp(formData)
        .then((data)=>{ alert('Registration Done, Please login to activate account!');history.go(0);
       })
        .catch((err)=>console.log(err));
       
    }
    catch(err){
        console.log(err.message);
    }
}