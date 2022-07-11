import React from 'react';
import { Route, Routes, Link } from "react-router-dom";

import HeaderComponent from '../common/HeaderComponent';
import FooterComponent from '../common/FooterComponent';
import ProductsComponent from '../catalog/ProductsComponent';
import ShoppingCartComponent from '../shoppingcart/ShoppingCartComponent';
import RegistrationComponent from './RegistrationComponent';
import LoginComponent from './LoginComponent';

import User from "../models/User";
import LoginDetail from "../models/LoginDetail";
import { connect } from "react-redux";

type Props = {
    accessToken:string | undefined,
    user:User | undefined,
    doLogin:(loginDetail:LoginDetail) => void,
    doLogout:() => void
}

// type State = {}

const MenuComponent = (props:Props) => {

    let title:string = "React Commerce";
    let headerStyle:React.CSSProperties = {
      color:'red'
    }

    return(
        <div>
            {
                (() => {
                    if (props.accessToken === undefined) {
                        return (
                            <div>
                                <nav className="navbar navbar-expand-lg bg-light">
                                    <div className="container-fluid">
                                        <span className="navbar-brand">React Commerce</span>
                                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                            <ul className="navbar-nav me-auto">
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/">Home</Link></li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/shoppingcart">Shopping Cart</Link></li>
                                            </ul>
                                            <ul className="navbar-nav mr-auto">
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/registration">Registration</Link></li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/login">Login</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                                <div className="container">
                                    <HeaderComponent title={ title } style={ headerStyle }/>
                                    <Routes>
                                        <Route path="/" element={ <ProductsComponent/> }/>
                                        <Route path="/shoppingcart" element={ <ShoppingCartComponent/> }/>
                                        <Route path="/registration" element={ <RegistrationComponent/> }/>
                                        <Route path="/login" element={ <LoginComponent/> }/>
                                    </Routes>
                                    <FooterComponent>Copyright to my Company</FooterComponent>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <nav className="navbar navbar-expand-lg bg-light">
                                    <div className="container-fluid">
                                        <span className="navbar-brand">React Commerce</span>
                                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                            <ul className="navbar-nav me-auto">
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/">Home</Link></li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/shoppingcart">Shopping Cart</Link></li>
                                            </ul>
                                            <ul className="navbar-nav mr-auto">
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/registration">Registration</Link></li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/login">{ props.user?.email }</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                                <div className="container">
                                    <HeaderComponent title={ title } style={ headerStyle }/>
                                    <Routes>
                                        <Route path="/" element={ <ProductsComponent/> }/>
                                        <Route path="/shoppingcart" element={ <ShoppingCartComponent/> }/>
                                        <Route path="/registration" element={ <RegistrationComponent/> }/>
                                        <Route path="/login" element={ <LoginComponent/> }/>
                                    </Routes>
                                    <FooterComponent>Copyright to my Company</FooterComponent>
                                </div>
                            </div>
                        )
                    }
                })()
            }
        </div>
    )

}

const mapStateToProps = (state:LoginDetail) => {
    return {
        accessToken: state.accessToken,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        doLogin: (loginDetail:LoginDetail) => { 
            dispatch({
                type:'DOLOGIN',
                loginDetail: loginDetail
            }) 
        },
        doLogout: () => dispatch({ type:'DOLOGOUT' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent)