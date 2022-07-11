import React, { Component } from "react"

import Product from "../models/Product";
import ShoppingCartItem from "../models/ShoppingCartItem";

import ProductGalleryComponent from "./ProductGalleryComponent";
import ProductListComponent from "./ProductListComponent";

import axios, { AxiosError, AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';

type State = {
    isGallery: boolean,
    searchResults: Product[],
    products: Product[],
    shoppingCart: ShoppingCartItem[],
    message: string
}

class ProductsComponent extends Component {

    APIENDPOINT = "http://localhost:8080/";

    state:State = {
        isGallery:true,
        searchResults:[],
        products:[],
        shoppingCart:[],
        message:""
    }

    componentDidMount() {
        axios.get<Product[]>(this.APIENDPOINT + "products")
            .then((response:AxiosResponse<Product[]>) => {
                this.setState({ products: response.data });
            }).catch((error:AxiosError) => {
                this.setState({ message: error.message })
            })
        axios.get<ShoppingCartItem[]>(this.APIENDPOINT + "shoppingcart")
            .then((response:AxiosResponse<ShoppingCartItem[]>) => {
                this.setState({ shoppingCart: response.data })
            }).catch((error:AxiosError) => {
                this.setState({ message:error.message })
            })
    }

    addToCart = (product:Product, requiredQuantity:number) => {
        let item:ShoppingCartItem = { id:0, product:product, requiredQuantity:requiredQuantity };
        let currentShoppingCart:ShoppingCartItem[] = this.state.shoppingCart;
        axios.post(this.APIENDPOINT + "shoppingcart", item)
            .then((response:AxiosResponse<ShoppingCartItem>) => {
                currentShoppingCart.push(response.data);
                this.setState({ shoppingCart: currentShoppingCart });
                this.setState({ message: "Product successfully added to shopping cart"})
            })
            .catch((error:AxiosError) => {
                this.setState({ message: error.message })
            })
    }

    doSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
        let searchKeyword:string = event.target.value;
        if (searchKeyword === '') {
            this.setState({ searchResults:[] });
        } else {
            let expression:RegExp = new RegExp('^' + searchKeyword, 'i');
            let results:Product[] = this.state.products.filter((product:Product) => {
                return expression.test(product.name);
            })
            this.setState({ searchResults: results })
        }
    }
    
    render() {
        return (
            <div>
                {
                    (this.state.message !== "") &&
                        <div className="alert alert-danger">
                            { this.state.message }</div>
                }
                <div className="row" style={{ paddingBottom:"15px" }}>
                    <div className="col-10">
                        <input type="text" className="form-control"
                            onChange={ this.doSearch }/>
                        <table className="table table-bordered">
                            <tbody>
                            {
                                this.state.searchResults.map((product:Product, index:number) => {
                                    return (
                                        <ProductListComponent product={product} key={index}
                                            click={ this.addToCart }/>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-1">
                        <Link to="/shoppingcart">
                            <button className="btn btn-primary position-relative">
                            &nbsp;Cart&nbsp;&nbsp;
                            <span className="position-absolute top-0 start-100 
                                translate-middle badge rounded-pill bg-danger">
                                    { this.state.shoppingCart.length }
                            </span>
                            </button>
                        </Link>
                    </div>
                    <div className="col-1">
                        <button className="btn btn-success" style={{ float:"right" }}
                            onClick={ () => { this.setState({ isGallery:!this.state.isGallery }) } }>
                            &nbsp;{ this.state.isGallery ? 'List' : 'Gallery' }&nbsp;</button>
                    </div>
                </div>
                {
                    (() => {
                        if (this.state.isGallery) {
                            return (
                                <div className="row">
                                { 
                                    this.state.products.map((product:Product, index:number) => {
                                        return (
                                            <ProductGalleryComponent product={ product } 
                                                key={ index } click={ this.addToCart }/>
                                        )
                                    })
                                }
                                </div>
                            )
                        } else {
                            return (
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
                                        this.state.products.map((product:Product, index:number) => {
                                            return (
                                                <ProductListComponent product={ product } 
                                                    key={ index } click={ this.addToCart }/>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            )
                        }
                    })()
                }
            </div>
        )
    }

}

export default ProductsComponent;