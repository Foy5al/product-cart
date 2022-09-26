import { Box, Button, Container, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useCartData from '../../../Hooks/useCartData';
import Paper from '@mui/material/Paper';

const CartCheckout = () => {
    const { cart, handleOneChange, hadnleManyChange, handleDelete, handleSelectedProduct, setCart } = useCartData();

    let total = 0;
    let price = 0;
    let subTotal = 0;
    let totalQuantity = 0;
    for (const product of cart) {

        if (product.qty === 1) {
            product.qty = 1;
        }
        price = parseFloat(product.price) * parseInt(product.qty);
        totalQuantity = totalQuantity + product.qty;
        total = total + price;
        subTotal = total;
    }

    const handleCheckoutBtn = e => {
        setCart([]);
        handleSelectedProduct([]);
    }
    return (
        <Container sx={{ mt: 10 }}>
            {

                cart[0]?.id ? <Box style={{ display: 'flex', margin: 'auto' }}>
                    <TableContainer sx={{ maxWidth: '70%' }} component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart?.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={{ display: 'flex', alignContent: 'center' }} component="th" scope="row">
                                            <span> <Button onClick={() => { handleDelete(product.id) }} sx={{ fontWeight: 'bold', fontSize: 20, color: 'red', mr: 2 }}> X </Button></span>
                                            <span> <img style={{ width: 50, height: 50 }} src={product.image} alt="product img" /></span>
                                            <span style={{ marginLeft: 10, maxWidth: 200 }}> {product.title}</span>
                                        </TableCell>

                                        <TableCell align="right">{product.price}</TableCell>

                                        <TableCell align="right">
                                            <Button onClick={() => { handleOneChange(product, false, true) }} sx={{ fontWeight: 'bold', fontSize: 20, }}> -</Button >

                                            <span >
                                                <Input type="number"
                                                    id={product.id}
                                                    onChangeCapture={hadnleManyChange}
                                                    style={{ width: 50, margin: 10 }}
                                                    inputProps={{ min: 1, max: product.stock, style: { textAlign: 'center' } }}
                                                    defaultValue={product.qty} />
                                            </span>

                                            <Button onClick={() => { handleOneChange(product, true, false) }} sx={{ fontWeight: 'bold', fontSize: 20, }}>+</Button>
                                        </TableCell>

                                        <TableCell align="right">{(parseFloat(product.price) * parseFloat(product.qty)).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* cartBox */}
                    <Box xs={{ display: 'block', marginTop: 10 }} style={{
                        width: '30%', marginTop: 50, marginLeft: 20
                    }}>
                        <Box sx={{ width: '100%', my: 'auto', borderRadius: '20px', boxShadow: 1 }}>
                            <Box sx={{ p: 1 }}>
                                <Typography variant='h5' sx={{ mb: 5, fontWeight: 'bold' }}>Cart Totals</Typography>
                                <Typography variant='p'>Sub Total:  <span style={{ color: '#3f50b5' }}>{subTotal.toFixed(2)}</span></Typography>
                                <hr />
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Total:  <span style={{ color: '#3f50b5' }}>{subTotal.toFixed(2)}</span></Typography>
                            </Box>

                            <Box sx={{ mt: 2 }} textAlign='center'>
                                <Button onClick={handleCheckoutBtn} style={{ borderRadius: 20, marginBottom: 20 }} variant='contained'>
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to='/checkout'> Processed To Checkout </Link>
                                </Button>
                            </Box>

                        </Box>
                    </Box>
                </Box> : <Box>
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>No Product Found in cart! Please go to <Link to='/'>shopping page</Link> for add product into the card!!</Typography>
                </Box>
            }
        </Container>
    );
};

export default CartCheckout;