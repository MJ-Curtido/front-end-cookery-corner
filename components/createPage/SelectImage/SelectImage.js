//#region Imports
import React from 'react';
import CSS from './SelectImage.module.css';
import { Avatar, Card, Grid, IconButton, ListItem, ListItemAvatar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUploader from '@/components/additional/ImageUploader/ImageUploader';
//#endregion

const SelectImage = ({ images, setImages }) => {
    const handleSetImages = (convertedImages) => {
        setImages([...images, ...convertedImages]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    return (
        <>
            <ImageUploader images={images} setImages={setImages} />

            <Card className={CSS.containerGrid} variant="outlined">
                <Grid className={CSS.grid} container spacing={2}>
                    {images.map((image, index) => (
                        <Grid item xs={6}>
                            <ListItem
                                className={CSS.listItem}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveImage(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={image} className={CSS.avatar} />
                                </ListItemAvatar>
                            </ListItem>
                        </Grid>
                    ))}
                </Grid>
            </Card>
        </>
    );
};

export default SelectImage;
