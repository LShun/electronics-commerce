import React, { Component } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import User from "../models/User";

type State = {
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    message:string
}

class RegistrationComponent extends Component {

    state:State = {
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        message:""
    }

    APIENDPOINT = "http://localhost:8080/";

    doRegister = () => {
        let user:User = {
            id: 0,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
        }
        axios.post<User>(this.APIENDPOINT + "users", user)
            .then((response:AxiosResponse<User>) => {
                this.setState({ message: "You have been registered successfully !!!"})
                this.setState({ firstname: "" })
                this.setState({ lastname: "" })
                this.setState({ email: "" })
                this.setState({ password: "" })
            })
            .catch((error:AxiosError) => {
                this.setState({ message: error.message })
            })
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">Registration</div>
                <div className="card-body">
                {
                    (this.state.message !== "") &&
                        <div className="alert alert-danger">
                            { this.state.message }</div>
                }
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label">First Name</label>
                        <input type="text" className="form-control" 
                            id="firstname" name="firstname" value={ this.state.firstname }
                            onChange={ (event:React.ChangeEvent<HTMLInputElement>) => {
                                this.setState({ firstname: event.target.value })
                            }}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input type="text" className="form-control" 
                            id="lastname" name="lastname" value={ this.state.lastname }
                            onChange={ (event:React.ChangeEvent<HTMLInputElement>) => {
                                this.setState({ lastname: event.target.value })
                            }}/>
                    </div>
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
                            onClick={ this.doRegister }>Register Me</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default RegistrationComponent;