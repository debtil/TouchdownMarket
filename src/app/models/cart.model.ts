export interface Cart {
    items: Array<CartItem>
}

export interface CartItem{
    images: string;
    name: string;
    price: number;
    description: string;
    category: string;
    quantity: number;
    id: string;
}
