import { useState } from 'react';

const useCart = () => {
    const [selectedProduct, handleSelectedProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const [snackbar, setSnackbar] = useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const handleAddCart = products => {
        for (const product of products) {
            let newCart = [];
            const exist = cart.find(pd => pd.id === product.id);
            console.log(exist, 'form exits');
            if (exist) {
                const rest = cart.filter(pd => pd.id !== product.id);
                exist.qty = exist.qty + 1;
                newCart = [...rest, product]

            }
            else {
                product.qty = 1;
                newCart = [...cart, product];
            }
            setCart(newCart);
        }
    }
    //plus btn and minus btn event
    const handleOneChange = (product, plus, minus) => {
        const updateProducId = product.id;
        const oldQty = parseInt(document.getElementById(updateProducId).value);
        if (plus) {
            if (product.stock > oldQty) {
                document.getElementById(updateProducId).value = oldQty + 1;
                updateProductQtyVal(oldQty, updateProducId);
            }
            else {
                setSnackbar({ children: 'Not enough stock available', severity: 'error' });
            }
        }
        if (minus) {
            if (oldQty > 1) {
                document.getElementById(updateProducId).value = oldQty - 1;
                updateProductQtyVal(oldQty, updateProducId);
            }
            else {
                setSnackbar({ children: 'Quantity cannot be 0', severity: 'error' });
            }
        }
    }
    // type input event 
    const hadnleManyChange = (event) => {
        const newQty = parseInt(event.target.value);
        const updateProducId = parseInt(event.target.id);
        updateProductQtyVal(newQty, updateProducId, event);

    }

    // common function for update plus minus and input data
    const updateProductQtyVal = (newQty, updateProducId, event) => {
        let newCart = [];
        const exist = cart.find(pd => pd.id === updateProducId);
        if (exist) {
            const rest = cart.filter(pd => pd.id !== updateProducId);
            if (exist.stock >= newQty) {
                exist.qty = newQty;
                newCart = [...rest, exist]
                setCart(newCart);
            }
            else {
                if (event) {
                    event.target.value = exist.stock;
                }
                exist.qty = exist.stock;
                newCart = [...rest, exist]
                setCart(newCart);
                setSnackbar({ children: 'Not enough stock available', severity: 'error' });
            }

        }
    }

    //delete btn event
    const handleDelete = id => {
        const remainingData = cart.filter(pd => pd.id !== id);
        console.log(remainingData, id);
        setCart(remainingData);
    }

    return {
        cart,
        setCart,
        handleAddCart,
        hadnleManyChange,
        handleOneChange,
        handleDelete,
        selectedProduct,
        handleSelectedProduct,
        snackbar, setSnackbar,
        handleCloseSnackbar
    };
};

export default useCart;