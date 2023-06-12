//#region Imports
import { Alert, Button, Divider, Snackbar, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CSS from './FormCreate.module.css';
import SelectImage from '../SelectImage/SelectImage';
import SelectIngredients from '../SelectIngredients/SelectIngredients';
import SelectSteps from '../SelectSteps/SelectSteps';
import { createRecipe } from '@/api/recipePetitions';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
//#endregion

const FormCreate = () => {
    //#region Elements
    const cookies = new Cookies();
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [price, setPrice] = useState('');
    const [severitySnackbar, setSeveritySnackbar] = useState('success');
    const [steps, setSteps] = useState([]);
    const [title, setTitle] = useState('');
    //#endregion

    //#region Functions
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title !== '' && description !== '' && !(price < 0) && ingredients.length > 0 && steps.length > 0) {
            const recipe = {
                title,
                description,
                price,
                images,
                ingredients,
                steps,
            };

            try {
                await createRecipe(recipe, cookies.get('token'));

                router.push('/cookerycorner/main');

                setMessageSnackbar('Recipe created.');
                setSeveritySnackbar('success');
                setOpenSnackbar(true);
            } catch (error) {
                setMessageSnackbar('Error creating the recipe.');
                setSeveritySnackbar('error');
                setOpenSnackbar(true);
            }
        } else {
            setMessageSnackbar('You have to complete the fields correctly.');
            setSeveritySnackbar('error');
            setOpenSnackbar(true);
        }
    };
    //#endregion

    return (
        <div className={CSS.container}>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity={severitySnackbar}>{messageSnackbar}</Alert>
            </Snackbar>

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
                    sx={{ marginBottom: '40px' }}
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
                    sx={{ marginBottom: '40px' }}
                    fullWidth
                    required
                />

                <TextField
                    type="number"
                    className={CSS.inputRecipe}
                    label="Price of the recipe..."
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    sx={{ marginBottom: '40px' }}
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

                <Typography className={CSS.titleSection} variant="h4" align="center" gutterBottom>
                    Steps
                </Typography>

                <SelectSteps steps={steps} setSteps={setSteps} />

                <Divider variant="fullWidth" className={CSS.divider} />

                <Button type="submit" className={CSS.button} variant="contained" color="secondary" onClick={handleSubmit}>
                    Create recipe
                </Button>
            </form>
        </div>
    );
};

export default FormCreate;
