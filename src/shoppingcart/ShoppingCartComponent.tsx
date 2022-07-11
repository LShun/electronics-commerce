import React, { Component } from "react"

import axios, { AxiosError, AxiosResponse } from 'axios';
import ShoppingCartItem from "../models/ShoppingCartItem";
import ShoppingCartItemComponent from "./ShoppingCartItemComponent";

type State = {
    shoppingCart:ShoppingCartItem[],
    message:string
}

class ShoppingCartComponent extends Component {

    APIENDPOINT = "http://localhost:8080/";

    state:State = {
        shoppingCart:[],
        message:""
    }

    componentDidMount() {
        this.doList();
    }

    doList() {
        axios.get<ShoppingCartItem[]>(this.APIENDPOINT + "shoppingcart")
            .then((response:AxiosResponse<ShoppingCartItem[]>) => {
                this.setState({ shoppingCart: response.data })
            }).catch((error:AxiosError) => {
                this.setState({ message:error.message })
            })
    }

    updateShoppingCart = (shoppingCartItem:ShoppingCartItem, requiredQuantity:number) => {
        shoppingCartItem.requiredQuantity = requiredQuantity;
        axios.put<ShoppingCartItem>(this.APIENDPOINT + "shoppingcart/" + shoppingCartItem.id, 
                shoppingCartItem)
            .then((response:AxiosResponse<ShoppingCartItem>) => {
                this.doList();
                this.setState({ message: "Shopping Cart Item updated successfully" });
            })
            .catch((error:AxiosError) => {
                this.setState({ message: error.message })
            })
    }

    deleteShoppingCart = (shoppingCartItem:ShoppingCartItem) => {
        axios.delete<ShoppingCartItem>(this.APIENDPOINT + "shoppingcart/" + shoppingCartItem.id)
            .then((response:AxiosResponse<ShoppingCartItem>) => {
                this.doList();
                this.setState({ message: "Shopping Cart Item deleted successfully" });
            })
            .catch((error:AxiosError) => {
                this.setState({ message: error.message })
            })
    }

    render() {
        return (
            <div>
                {
                    (this.state.message !== "") &&
                        <div className="alert alert-danger">
                            { this.state.message }</div>
                }
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan={2}>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.shoppingCart.map((shoppingCartItem:ShoppingCartItem, index:number) => {
                            return (
                                <ShoppingCartItemComponent shoppingCartItem={ shoppingCartItem } 
                                    key={ index } updateClick={ this.updateShoppingCart }
                                    deleteClick={ this.deleteShoppingCart } />
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ShoppingCartComponent;