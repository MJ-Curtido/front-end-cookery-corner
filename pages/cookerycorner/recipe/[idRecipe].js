import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getRecipe } from '@/api/recipePetitions';

const Recipe = ({ recipe }) => {
    console.log(recipe);
    const router = useRouter();

    useEffect(() => {
        if (!recipe) {
            console.log('No recipe');
            router.push('/cookerycorner/main');
        }
    }, []);

    return (
        <div>
            <h1>Recipe</h1>
            <p>Recipe ID: {recipe ? recipe.title : ''}</p>
        </div>
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
