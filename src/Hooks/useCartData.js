import { useContext } from "react";
import { CartContext } from "../context/CartDataProvider";

const useCartData = () => {
    return useContext(CartContext);
}

export default useCartData;