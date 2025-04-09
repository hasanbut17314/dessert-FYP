import { createContext } from 'react';

export const CartContext = createContext(
    {
        cartItems: [],
        setCartItems: () => {},
        totalPrice: 0,
        removeFromCart: () => {},
        increaseQuantity: () => {},
        decreaseQuantity: () => {},
        setTotalPrice: () => {},
        totalQuantity: 0,
        setTotalQuantity: () => {},
    }
);