//#region Imports
import React, { useRef, useState } from 'react';
import CSS from './SelectImage.module.css';
import { Avatar, Button, Card, Grid, IconButton, ListItem, ListItemAvatar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
//#endregion

const SelectImage = ({ images, setImages }) => {
    const [imagesTemp, setImagesTemp] = useState([]);
    const fileInputRef = useRef(null);

    //#region Functions
    const handleRemoveImage = (index) => {
        const updatedImagesTemp = [...imagesTemp];
        updatedImagesTemp.splice(index, 1);
        setImagesTemp(updatedImagesTemp);

        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        const updatedImages = [...images];
        updatedImages.push(file);

        setImages(updatedImages);

        const updatedImagesTemp = [...imagesTemp];
        updatedImagesTemp.push(URL.createObjectURL(file));

        setImagesTemp(updatedImagesTemp);
    };
    //#endregion

    return (
        <>
            <div>
                <input
                    type="file"
                    id="image-input"
                    accept="image/png, image/jpeg"
                    multiple={false}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                <Button
                    className={CSS.btn}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        fileInputRef.current.click();
                    }}
                >
                    Upload images
                </Button>
            </div>

            <Card className={CSS.containerGrid} variant="outlined">
                <Grid className={CSS.grid} container spacing={2}>
                    {imagesTemp.map((image, index) => (
                        <Grid key={index} item xs={6}>
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
