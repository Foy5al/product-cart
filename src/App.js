import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductListing from './Pages/ProductListing/ProductListing/ProductListing';
import CartCheckout from './Pages/CartCheckout/CartCheckout/CartCheckout';
import CartDataProvider from './context/CartDataProvider';
import OrderConfirm from './Pages/OrderConfirm/OrderConfirm';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <CartDataProvider>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/cart" element={<CartCheckout />} />
          <Route path="/checkout" element={<OrderConfirm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartDataProvider>
    </div>
  );
}

export default App;
