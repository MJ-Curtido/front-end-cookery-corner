//#region Imports
import React from 'react';
import CSS from './SelectImage.module.css';
import { Avatar, Card, Grid, IconButton, ListItem, ListItemAvatar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
//#endregion

//TODO: Implementar que recorra las imágenes de un array imagenes que tendrá en el componente padre

function generate(element) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 17].map((value) =>
        React.cloneElement(element, {
            key: value,
        })
    );
}

const SelectImage = ({ image, setImage }) => {
    return (
        <>
            <Card className={CSS.containerGrid} variant="outlined" elevation={3} >
                <Grid className={CSS.grid} container spacing={2}>
                    {generate(
                        <Grid item xs={6}>
                            <ListItem
                                className={CSS.listItem}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar className={CSS.avatar} />
                                </ListItemAvatar>
                            </ListItem>
                        </Grid>
                    )}
                </Grid>
            </Card>
        </>
    );
};

export default SelectImage;
