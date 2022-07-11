import React, { Component } from "react"
import Product from "../models/Product";

type Props = {
    product:Product
    click:(product:Product, requiredQuantity:number) => void
}

type State = {
    requiredQuantity:number
}

class ProductGalleryComponent extends Component<Props> {

    state:State = {
        requiredQuantity: 0
    }

    render() {
        return (
            <div className="col-4" style={{ paddingBottom:"15px" }}>
                <div className="card">
                    <img className="card-img-top" src={ this.props.product.photo }
                        alt={ this.props.product.name }/>
                    <div className="card-body">
                        <h5 className="card-title">{ this.props.product.name }</h5>
                        <p className="card-text">{ this.props.product.description }</p>
                        <h6>Quantity:{ this.props.product.quantity }</h6>
                        <h6>Price:{ this.props.product.price }</h6>
                        <input type="text" size={3} maxLength={3}
                            onChange={ (event:React.ChangeEvent<HTMLInputElement>) => { 
                                    this.setState({requiredQuantity: event?.target.value}) 
                                }
                            }/>&nbsp;
                        <button className="btn btn-success"
                            onClick={ this.props.click.bind(this, 
                                this.props.product, this.state.requiredQuantity) }>Add to Cart</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProductGalleryComponent;