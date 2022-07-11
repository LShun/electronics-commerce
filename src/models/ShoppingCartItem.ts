import Product from "./Product";

interface ShoppingCartItem {
    id: number;
    product: Product;
    requiredQuantity: number;
}

export default ShoppingCartItem;