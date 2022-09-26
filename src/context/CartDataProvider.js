import React, { createContext } from 'react';
import useCart from '../Hooks/useCart';

export const CartContext = createContext();

const CartDataProvider = ({ children }) => {
    const allContext = useCart();
    return (
        <CartContext.Provider value={allContext}>
            {children}
        </CartContext.Provider>
    );
};

export default CartDataProvider;