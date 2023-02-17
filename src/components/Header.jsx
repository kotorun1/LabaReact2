import React from "react";
import { BrowserRouter as useParams, useNavigate, BrowserRouter, Link } from 'react-router-dom';


export default function Header({handleLogout, isLoggedIn}) {

    return (
    <div className="header">
        <h1 className="header__logo">Pets</h1>
        <div className="header__links">
            <nav className="header__list">
                {isLoggedIn&&<li><Link className="header__link" to="/">Home</Link></li>}
                {isLoggedIn&&<li><Link className="header__link" to="/cart">Cart</Link></li>}
                {isLoggedIn&&<li><Link className="header__link" to="/order">Order</Link></li>}
                {!isLoggedIn&&<li><Link className="header__link" to="/login">Login</Link></li>}
                {!isLoggedIn&&<li><Link className="header__link" to="/registration">Registration</Link></li>}
                {isLoggedIn&&<li className="header__link" onClick={()=>handleLogout()}>Logout</li>}
            </nav>
            
        </div>
    </div>
    )

}