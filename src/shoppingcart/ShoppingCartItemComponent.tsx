import React, { useState } from "react"
import ShoppingCartItem from "../models/ShoppingCartItem";

type Props = {
    shoppingCartItem:ShoppingCartItem,
    updateClick:(shoppingCartItem:ShoppingCartItem, requiredQuantity:number) => void,
    deleteClick:(shoppingCartItem:ShoppingCartItem) => void
}

const ShoppingCartItemComponent:React.FC<Props> = (props:Props) => {

    let [requiredQuantity, setRequiredQuantity] = 
        useState<number>(props.shoppingCartItem.requiredQuantity)

    return (
        <tr>
            <td>
                <img className="thumbnail" src={ props.shoppingCartItem.product.photo }
                    alt={ props.shoppingCartItem.product.name } width="150"/>
            </td>
            <td>
                <h5>{ props.shoppingCartItem.product.name }</h5>
                <p>{ props.shoppingCartItem.product.description }</p>
            </td>
            <td><h6>{ props.shoppingCartItem.product.quantity }</h6></td>
            <td><h6>{ props.shoppingCartItem.product.price }</h6></td>
            <td>
            <input type="text" size={3} maxLength={3} value={ requiredQuantity }
                onChange={ (event:React.ChangeEvent<HTMLInputElement>) => { 
                        setRequiredQuantity(+event.target.value) 
                    }
                }/>&nbsp;
            <button className="btn btn-primary"
                onClick={ props.updateClick.bind(null, props.shoppingCartItem, requiredQuantity) }>
                    Update</button>&nbsp;
            <button className="btn btn-danger"
                onClick={ props.deleteClick.bind(null, props.shoppingCartItem) }>Delete</button>
            </td>
        </tr>
    )
}

export default ShoppingCartItemComponent;