import React, { useState } from "react"
import Product from "../models/Product";

type Props = {
    product:Product
    click:(product:Product, requiredQuantity:number) => void
}

const ProductListComponent:React.FC<Props> = (props:Props) => {

    let [requiredQuantity, setRequiredQuantity] = useState<number>(0)

    return (
        <tr>
            <td>
                <img className="thumbnail" src={ props.product.photo }
                    alt={ props.product.name } width="150"/>
            </td>
            <td>
                <h5>{ props.product.name }</h5>
                <p>{ props.product.description }</p>
            </td>
            <td><h6>{ props.product.quantity }</h6></td>
            <td><h6>{ props.product.price }</h6></td>
            <td>
            <input type="text" size={3} maxLength={3}
                onChange={ (event:React.ChangeEvent<HTMLInputElement>) => { 
                        setRequiredQuantity(+event.target.value) 
                    }
                }/>&nbsp;
            <button className="btn btn-success"
                onClick={ props.click.bind(null, 
                    props.product, requiredQuantity) }>Add to Cart</button>
            </td>
        </tr>
    )
}

export default ProductListComponent;