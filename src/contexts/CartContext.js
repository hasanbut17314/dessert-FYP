import { createContext } from 'react';

export const CartContext = createContext(
    {
        cartItems: [],
        setCartItems: () => {},
        totalPrice: 0,
        removeFromCart: () => {},
        setTotalPrice: () => {},
        totalQuantity: 0,
        setTotalQuantity: () => {},
    }
);