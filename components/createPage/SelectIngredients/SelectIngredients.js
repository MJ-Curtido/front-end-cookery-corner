//#region Imports
import React, { Fragment, useState } from 'react';
import CSS from './SelectIngredients.module.css';
import { Alert, Card, Grid, IconButton, ListItem, ListItemText, Snackbar, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
//#endregion

const SelectIngredients = ({ ingredients, setIngredients }) => {
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [name, setName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [severitySnackbar, setSeveritySnackbar] = useState('success');
    const [unit, setUnit] = useState('');

    //#region Functions
    const handleSubmit = (e) => {
        e.preventDefault();

        if (name !== '' && quantity !== '') {
            const newIngredient = {
                name,
                quantity,
                unit,
            };

            setIngredients([...ingredients, newIngredient]);

            setName('');
            setQuantity('');
            setUnit('');
        } else {
            setMessageSnackbar('You have to complete the fields.');
            setSeveritySnackbar('error');
            setOpenSnackbar(true);
        }
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };
    //#endregion

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity={severitySnackbar}>{messageSnackbar}</Alert>
            </Snackbar>

            <div className={CSS.container}>
                <TextField
                    value={name}
                    required
                    className={CSS.input}
                    label="Name"
                    variant="outlined"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <TextField
                    value={quantity}
                    type="number"
                    required
                    className={CSS.input}
                    label="Quantity"
                    variant="outlined"
                    onChange={(e) => {
                        setQuantity(e.target.value);
                    }}
                />
                <TextField
                    value={unit}
                    required={false}
                    className={CSS.input}
                    label="Unit"
                    variant="outlined"
                    onChange={(e) => {
                        setUnit(e.target.value);
                    }}
                />

                <IconButton className={CSS.button} aria-label="add" color="secondary" onClick={handleSubmit}>
                    <AddCircleIcon />
                </IconButton>
            </div>

            <Card className={CSS.containerGrid} variant="outlined">
                <Grid className={CSS.grid} container spacing={2}>
                    {ingredients.map((ingredient, index) => (
                        <Grid key={index} item xs={6}>
                            <ListItem
                                className={CSS.listItem}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveIngredient(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={
                                        <Typography className={CSS.nameIng} variant="h6" component="span">
                                            {ingredient.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Fragment>
                                            <Typography variant="body1" component="span">
                                                Quantity: {ingredient.quantity}
                                            </Typography>
                                            <br />
                                            {ingredient.unit && (
                                                <Typography variant="body1" component="span">
                                                    Unit: {ingredient.unit}
                                                </Typography>
                                            )}
                                        </Fragment>
                                    }
                                />
                            </ListItem>
                        </Grid>
                    ))}
                </Grid>
            </Card>
        </>
    );
};

export default SelectIngredients;
