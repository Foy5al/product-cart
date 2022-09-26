import React from 'react';

const SelectedProducts = ({ product }) => {
    return (
        <div>
            {product[0]?.id ?
                <h1>{product.title}</h1>
                : <><h1>no data in the cart</h1></>
            }
        </div>
    );
};

export default SelectedProducts;