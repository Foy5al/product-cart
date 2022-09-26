import React, { useCallback, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import rows from '../../../fakedata.json';
import { Alert, Snackbar } from '@mui/material';
import useCartData from '../../../Hooks/useCartData';

const columns = [
    {
        field: 'image',
        headerName: 'Image',
        width: 100,
        height: 70,
        editable: true,
        renderCell: (params) => <img style={{ width: 50, height: 50, }} src={params.value} alt='img' />,
    },
    { field: 'size', headerName: 'Size', width: 70 },
    { field: 'title', headerName: 'Name', width: 350 },
    { field: 'color', headerName: 'Color', width: 130 },
    { field: 'stock', headerName: 'Stock', width: 130 },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 90,
    },
    {
        field: 'qty',
        headerName: 'quantity',
        type: 'number',
        width: 90,
        editable: true
    },
];


const useFakeMutation = () => {
    return useCallback(
        (user) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    if (user.name?.trim() === '') {
                        reject(new Error("Error while saving user: name can't be empty."));
                    } else {
                        resolve({ ...user, name: user.name?.toUpperCase() });
                    }
                }, 200),
            ),
        [],
    );
};

const ProductsData = ({ product, setProduct }) => {
    // send data to context
    const { handleSelectedProduct } = useCartData();
    const [snackbar, setSnackbar] = useState(null);
    const mutateRow = useFakeMutation();


    const processRowUpdate = React.useCallback(
        async (newRow, oldRow) => {
            let qty = newRow.qty;
            if (qty > 0) {

                if (qty !== oldRow.qty && qty <= newRow.stock) {
                    // Make the HTTP request to save in the backend
                    const response = await mutateRow(newRow);
                    let data = [];
                    const updateQty = product.filter(pd => pd.id !== newRow.id);
                    data = [...updateQty, newRow];
                    handleSelectedProduct(data, newRow);
                    setProduct(data);
                    setSnackbar({ children: 'Quantity successfully updated', severity: 'success' });
                    return response;
                }
                setSnackbar({ children: 'Quantity cannot be bigger than stock', severity: 'error' });
                console.log('quantity cannot be bigger than stock');
                const response = await mutateRow(oldRow);
                return response;
            }
            setSnackbar({ children: 'Quantity cannot be a minus number', severity: 'error' });
            const response = await mutateRow(oldRow);
            return response;
        },
        [mutateRow],
    );

    const handleProcessRowUpdateError = useCallback((error) => {
        /*  setSnackbar({ children: error.message, severity: 'error' }); */
    }, []);

    const handleCloseSnackbar = () => setSnackbar(null);
    return (
        <div style={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={product}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onSelectionModelChange={
                    async (ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRowData = await rows.filter((row) =>
                            selectedIDs.has(row.id)
                        )
                        handleSelectedProduct(selectedRowData);
                    }}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                experimentalFeatures={{ newEditingApi: true }}
                checkboxSelection
            />
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </div>
    );
};

export default ProductsData;