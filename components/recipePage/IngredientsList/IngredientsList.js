//#region Imports
import React, { Fragment } from 'react';
import { Typography, Grid, ListItem, ListItemText } from '@mui/material';
import CSS from './IngredientsList.module.css';
//#endregion

const IngredientsList = ({ ingredients }) => {
    return (
        <div className={CSS.container}>
            <Typography className={CSS.title} variant="h3" align="center" gutterBottom>
                Ingredients
            </Typography>

            <Grid container spacing={2}>
                {ingredients.map((ingredient, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <ListItem>
                            <ListItemText
                                className={CSS.ingredient}
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
        </div>
    );
};

export default IngredientsList;
