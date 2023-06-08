//#region Imports
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getIsMine, getRecipe } from '@/api/recipePetitions';
import RecipeDetail from '@/components/recipePage/RecipeDetail/RecipeDetail';
import Layout from '@/components/additional/Layout';
import AuthGuard from '@/components/additional/AuthGuard';
import { Divider, Typography } from '@mui/material';
import IngredientsList from '@/components/recipePage/IngredientsList/IngredientsList';
import StepsList from '@/components/recipePage/StepsList/StepsList';
import { getIsBought } from '@/api/purchasePetitions';
import ReviewsList from '@/components/recipePage/ReviewsList/ReviewsList';
//#endregion

const Recipe = ({ recipe, bought, isMine }) => {
    const router = useRouter();
    const reviews = useRef('reviews');

    useEffect(() => {
        if (!recipe) {
            router.push('/cookerycorner/main');
        }
    }, []);

    const scrollToBottom = () => {
        console.log(reviews.current);
        reviews.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        recipe && (
            <AuthGuard>
                <Layout>
                    <RecipeDetail bought={bought} recipe={recipe} isMine={isMine} scrollToBottom={scrollToBottom} />

                    <Divider variant="middle" />

                    {bought || isMine ? (
                        <>
                            <IngredientsList ingredients={recipe.ingredients} />

                            <Divider variant="middle" />

                            <StepsList steps={recipe.steps} />
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
                        <ReviewsList reviews={recipe.reviews} bought={bought} isMine={isMine} />
                    </div>
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
