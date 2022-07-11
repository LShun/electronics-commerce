import React, { Component } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import User from "../models/User";
import LoginDetail from "../models/LoginDetail";
import { connect } from "react-redux";

type Props = {
    accessToken:string | undefined,
    user:User | undefined,
    doLogin:(loginDetail:LoginDetail) => void,
    doLogout:() => void
}

type State = {
    email:string,
    password:string,
    message:string,
    loginDetail?:LoginDetail
}

class LoginComponent extends Component<Props> {

    state:State = {
        email:"",
        password:"",
        message:""
    }

    APIENDPOINT = "http://localhost:8080/";

    doLogin = () => {
        let credentials = {
            email: this.state.email,
            password: this.state.password,
        }
        axios.post<LoginDetail>(this.APIENDPOINT + "login", credentials)
            .then((response:AxiosResponse<LoginDetail>) => {
                this.props.doLogin(response.data);
                this.setState({ loginDetail: response.data });
            })
            .catch((error:AxiosError) => {
                this.setState({ message: error.message })
            })
    }

    doLogout = () => {
        this.setState({ email: "" });
        this.setState({ password: "" });
        this.setState({ loginDetail: undefined });
        this.props.doLogout();
    }

    render() {
        // if (this.state.loginDetail === undefined) {
        if (this.props.accessToken === undefined) {
            return (
                <div className="card">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                    {
                        (this.state.message !== "") &&
                            <div className="alert alert-danger">
                                { this.state.message }</div>
                    }
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" 
                                id="email" name="email" value={ this.state.email }
                                onChange={ (event:React.ChangeEvent<HTMLInputElement>) => {
                                    this.setState({ email: event.target.value })
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" 
                                id="password" name="password" value={ this.state.password }
                                onChange={ (event:React.ChangeEvent<HTMLInputElement>) => {
                                    this.setState({ password: event.target.value })
                                }}/>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary"
                                onClick={ this.doLogin }>Login</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="card">
                    <div className="card-header">Dashboard</div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label><br/>
                            <label htmlFor="email" className="form-label">
                                { this.props.user?.email }</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="token" className="form-label">Access Token</label><br/>
                            <label htmlFor="token" className="form-label">
                                { this.props.accessToken }</label>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary"
                                onClick={ this.doLogout }>Logout</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
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

// the connect function takes two functions as argument and return a function
// LoginComponent will be passed as argument to the returned function
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);