import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { signIn, signUp } from '../actions/auth';
import Navbar from './navbar'
import '../style/main.css'

const signUpState = { userName: '', email: '', password: '', cnfPassword: '' }
const signInState = { signInEmail: '', signInPassword: '' }

const Login = () => {
    const [loginData, setLoginData] = useState(signInState);
    const [registerData, setRegisterData] = useState(signUpState);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSignInChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    const handleSignUpChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }
    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(signIn(loginData, history));
    }
    const handleSignUp = (e) => {
        e.preventDefault();
        if (registerData.password === registerData.cnfPassword) {
            dispatch(signUp(registerData, history));
        }
        else {
            alert('Passwords do not match');
        }
    }
    const [isLogin, setIsLogin] = useState(false);
    function handlePageChange(e) {
        e.preventDefault();
        setIsLogin(!isLogin);
    }
    if (isLogin) {
        return (
            <>
                <Navbar />
                <div className="section-fill-leftImg first-project" style={{ marginTop: '5rem' }}>
                    <div className="project-img-container" style={{ opacity: '1', transform: 'none' }} >
                        <div className="project-img">
                            <img src='https://broomies-frontend.vercel.app/images/find-roommate.svg' alt='img'></img>
                        </div>
                    </div>
                    <div className="project-content" style={{ opacity: '1', transform: 'none', width: '100%' }}>
                        <h1>Register</h1>
                        <form onSubmit={handleSignUp}>
                            <div className="mb-3 form-group">
                                <label className="form-label" >Full Name</label>
                                <input placeholder="Full Name" name="userName" required type="text" id="fullName" className="form-control" onChange={handleSignUpChange} />

                            </div>
                            <div className="mb-3 form-group">
                                <label className="form-label" >Email</label>
                                <input placeholder="Email" required name="email" type="email" id="signUpEmail" className="form-control" onChange={handleSignUpChange} />

                            </div>
                            <div className="mb-3 form-group">
                                <label className="form-label" >Password</label>
                                <input placeholder="Password" name="password" required type="password" id="signUpPassword" className="form-control" onChange={handleSignUpChange} />

                            </div>
                            <div className="mb-3 form-group">
                                <label className="form-label" >Confirm Password</label>
                                <input placeholder="Confirm Password" name="cnfPassword" required type="password" id="signUpCnfPassword" className="form-control" onChange={handleSignUpChange} />

                            </div>
                            <hr className="my-4"></hr>
                            <button type="submit" className="btn btn-primary" >Register</button>
                            <label className="form-label" style={{ padding: '2px' }}>Already a user?<a style={{ textDecoration: 'none', color: '#0d6efd', cursor: 'pointer' }} href='/' onClick={handlePageChange}> Sign In</a> </label>
                        </form>
                    </div>
                </div></>)
    }
    else {
        return (<>
            <Navbar />
            <div className="section-fill-leftImg first-project" style={{ marginTop: '7rem' }}>
                <div className="project-img-container" style={{ opacity: '1', transform: 'none' }} >
                    <div className="project-img">
                        <img src='https://broomies-frontend.vercel.app/images/find-roommate.svg' alt='img'></img>
                    </div>
                </div>
                <div className="project-content" style={{ opacity: '1', transform: 'none', width: '100%' }}>
                    <h1>Login</h1>
                    <form onSubmit={handleSignIn}>
                        <div className="mb-3 form-group">
                            <label className="form-label" >Email</label>
                            <input placeholder="Email ID" required name="signInEmail" type="email" id="signInEmail" className="form-control" onChange={handleSignInChange} />

                        </div>
                        <div className="mb-3 form-group">
                            <label className="form-label" >Password</label>
                            <input placeholder="Password" name="signInPassword" required type="password" id="signInPassword" onChange={handleSignInChange} className="form-control" />

                        </div>
                        <hr className="my-4"></hr>
                        <button disabled="" type="submit" className="btn btn-primary" >Login</button>
                        <label className="form-label" style={{ padding: '2px' }}>New user?<a style={{ textDecoration: 'none', color: '#0d6efd', cursor: 'pointer' }} href='/' onClick={handlePageChange}> Sign Up</a> </label>
                    </form>
                </div>
            </div></>);
    }

}

export default Login;