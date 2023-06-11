//#region Imports
import { Button, Divider, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CSS from './FormCreate.module.css';
import SelectImage from '../SelectImage/SelectImage';
import SelectIngredients from '../SelectIngredients/SelectIngredients';
//#endregion

const FormCreate = () => {
    //#region Elements
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    //#endregion

    //#region Functions
    const handleSubmit = async (e) => {
        if (description !== '') {
            e.preventDefault();

            const review = {
                reviews: {
                    text: description,
                    valuation: rating,
                    user: user._id,
                },
            };

            try {
                await pushReview(idRecipe, review, cookies.get('token'));

                updateRecipe();

                setDescription('');
                setRating(0);

                setMessageSnackbar('Review sent.');
                setSeveritySnackbar('success');
                setOpenSnackbar(true);
            } catch (error) {
                setMessageSnackbar('Error sending review.');
                setSeveritySnackbar('error');
                setOpenSnackbar(true);
            }
        }
    };
    //#endregion

    return (
        <div className={CSS.container}>
            <Typography className={CSS.title} variant="h1">
                Create recipe
            </Typography>

            <form className={CSS.formCreate} onSubmit={handleSubmit}>
                <Typography className={CSS.titleSection} variant="h4" align="center" gutterBottom>
                    Title and description
                </Typography>

                <TextField
                    className={CSS.inputRecipe}
                    label="Title of the recipe..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                />

                <TextField
                    className={CSS.inputRecipe}
                    label="Description of the recipe..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                />

                <Typography className={CSS.titleSection} variant="h4" align="center" gutterBottom>
                    Images
                </Typography>

                <SelectImage images={images} setImages={setImages} />

                <Typography className={CSS.titleSection} variant="h4" align="center" gutterBottom>
                    Ingredients
                </Typography>

                <SelectIngredients ingredients={ingredients} setIngredients={setIngredients} />

                <Divider variant='middle' />

                <Button type="submit" className={CSS.button} variant="contained" color="secondary" onClick={handleSubmit}>
                    Create recipe
                </Button>
            </form>
        </div>
    );
};

export default FormCreate;
