//#region Imports
import { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CSS from './ModalShopNow.module.css';
//#endregion

const ModalShopNow = ({ open, onSetOpen, onBuyHandler }) => {
    //#region Elements
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    //#endregion

    const handleFormSubmit = (e) => {
        e.preventDefault();

        onBuyHandler();
    };

    return (
        <Modal open={open}>
            <Box className={CSS.modal}>
                <Typography variant="h5" gutterBottom>
                    Payment details
                </Typography>

                <form onSubmit={handleFormSubmit}>
                    <TextField className={CSS.input} label="Card number" fullWidth value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />

                    <TextField className={CSS.input} label="Cardholder" fullWidth value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} required />

                    <Box className={CSS.input} sx={{ display: 'flex', gap: '8px' }}>
                        <FormControl className={CSS.month}>
                            <InputLabel>Expiration month</InputLabel>
                            <Select value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)} required>
                                {Array.from({ length: 12 }, (_, index) => {
                                    const month = String(index + 1).padStart(2, '0');
                                    return (
                                        <MenuItem className={CSS.input} key={month} value={month}>
                                            {month}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <FormControl className={CSS.year}>
                            <InputLabel>Expiration year</InputLabel>
                            <Select value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)} required>
                                {Array.from({ length: 8 }, (_, index) => {
                                    const year = new Date().getFullYear() + index;
                                    return (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>

                    <TextField className={CSS.input} label="CVV" fullWidth value={cvv} onChange={(e) => setCvv(e.target.value)} required />

                    <Button className={CSS.btnBuy} type="submit" variant="contained">
                        Buy
                    </Button>

                    <Button
                        className={CSS.btnCancel}
                        onClick={() => {
                            onSetOpen(false);
                        }}
                        variant="contained"
                    >
                        Cancel
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default ModalShopNow;
