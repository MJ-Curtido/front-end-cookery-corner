//#region Imports
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { getIsMine, getRecipe } from '@/api/recipePetitions';
import Cookies from 'universal-cookie';
import RecipeDetail from '@/components/recipePage/RecipeDetail/RecipeDetail';
import Layout from '@/components/additional/Layout';
import AuthGuard from '@/components/additional/AuthGuard';
import { Alert, Divider, Snackbar, Typography } from '@mui/material';
import IngredientsList from '@/components/recipePage/IngredientsList/IngredientsList';
import StepsList from '@/components/recipePage/StepsList/StepsList';
import { buyRecipe, getIsBought } from '@/api/purchasePetitions';
import ReviewsList from '@/components/recipePage/ReviewsList/ReviewsList';
import ModalShopNow from '@/components/additional/ModalShopNow/ModalShopNow';
//#endregion

const Recipe = ({ recipe, bought, isMine }) => {
    //#region Elements
    const router = useRouter();
    const cookies = new Cookies();
    const reviews = useRef('reviews');
    const [actualRecipe, setActualRecipe] = useState(recipe);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severitySnackbar, setSeveritySnackbar] = useState('success');
    //#endregion

    useEffect(() => {
        if (!recipe) {
            router.push('/cookerycorner/main');
        }
    }, []);

    //#region Functions
    const scrollToBottom = () => {
        console.log(reviews.current);
        reviews.current.scrollIntoView({ behavior: 'smooth' });
    };

    const updateRecipe = async () => {
        const newRecipe = await getRecipe(recipe._id, cookies.get('token'));

        setActualRecipe(newRecipe);
    };

    const buyHandler = async () => {
        const token = cookies.get('token');

        try {
            await buyRecipe(recipe._id, token);

            setMessageSnackbar('Recipe purchased successfully.');
            setSeveritySnackbar('success');
            setOpenSnackbar(true);

            router.push('/cookerycorner/purchased');
        } catch (error) {
            setMessageSnackbar('There is something wrong.');
            setSeveritySnackbar('error');
            setOpenSnackbar(true);
        }

        setOpen(false);
    };
    //#endregion

    return (
        recipe && (
            <AuthGuard>
                <Layout>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={() => setOpenSnackbar(false)}
                    >
                        <Alert severity={severitySnackbar}>{messageSnackbar}</Alert>
                    </Snackbar>

                    <RecipeDetail bought={bought} recipe={actualRecipe} isMine={isMine} scrollToBottom={scrollToBottom} onSetOpen={setOpen} />

                    <Divider variant="middle" />

                    {bought || isMine ? (
                        <>
                            <IngredientsList ingredients={actualRecipe.ingredients} />

                            <Divider variant="middle" />

                            <StepsList steps={actualRecipe.steps} />
                        </>
                    ) : (
                        <div>
                            <Typography sx={{ marginTop: '40px', marginBottom: '40px' }} variant="h5" component="h2" align="center">
                                You have to buy this recipe to see the ingredients and steps.
                            </Typography>
                        </div>
                    )}

                    <Divider variant="middle" />

                    <div ref={reviews}>
                        <ReviewsList idRecipe={actualRecipe._id} reviews={actualRecipe.reviews} bought={bought} isMine={isMine} updateRecipe={updateRecipe} />
                    </div>

                    <ModalShopNow open={open} onSetOpen={setOpen} onBuyHandler={buyHandler} />
                </Layout>
            </AuthGuard>
        )
    );
};

export async function getServerSideProps(context) {
    try {
        const { idrecipe } = context.query;

        const token = context.req.cookies.token;

        const recipe = await getRecipe(idrecipe, token);

        const bought = await getIsBought(idrecipe, token);

        const isMine = await getIsMine(idrecipe, token);

        return {
            props: {
                recipe: recipe,
                bought: bought.bought,
                isMine: isMine.isMine,
            },
        };
    } catch (error) {
        return {
            props: {
                recipe: null,
            },
        };
    }
}

export default Recipe;
