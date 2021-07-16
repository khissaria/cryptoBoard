import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import '../style/LoginNavbar.css'


function LoginNavbar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [dropdown, setDropdown] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

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


    
    function showDropdown(e) {
        setDropdown(!dropdown);
    }
    return (
        <nav id="navbar" className="Header_navbar__3eXEA  px-5 py-3 shadow navbar navbar-expand navbar-dark fixed-top"><div className="container">
            <h2><a href='/home' style={{ textDecoration: 'none', color: '#0d6efd' }}>CryptoBoard</a></h2>
            <div className="mr-auto navbar-nav">
                <div className="nav-item dropdown">
                    <a aria-haspopup="true" aria-expanded="false" id="username" href="#" className="dropdown-toggle nav-link" role="button" onClick={showDropdown}>{user ? user.profile.email : ''}</a>
                    <div aria-labelledby="username" className={dropdown ? "dropdown-menu show" : "dropdown-menu"} style={{ right: '0.1px' }} >
                        <a href="#" className="dropdown-item" role="button" onClick={logout} >Logout</a>
                    </div>
                </div>
            </div>
        </div>
        </nav>
    )
}

export default LoginNavbar;