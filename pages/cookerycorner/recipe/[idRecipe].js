//#region Imports
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getRecipe } from '@/api/recipePetitions';
import RecipeDetail from '@/components/recipePage/RecipeDetail/RecipeDetail';
import Layout from '@/components/additional/Layout';
import AuthGuard from '@/components/additional/AuthGuard';
import { Divider } from '@mui/material';
import IngredientsList from '@/components/recipePage/IngredientsList/IngredientsList';
//#endregion

const Recipe = ({ recipe }) => {
    const router = useRouter();
    const reviews = useRef('reviews');

    // <div>
    //     <button ref={reviews}>yujuu</button>
    // </div>;

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
                    <RecipeDetail recipe={recipe} scrollToBottom={scrollToBottom} />

                    <Divider />

                    <IngredientsList ingredients={recipe.ingredients} />

                    <Divider />

                    
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

        return {
            props: {
                recipe: recipe,
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
