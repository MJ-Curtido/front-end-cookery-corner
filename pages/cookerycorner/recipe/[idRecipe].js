import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getRecipe } from '@/api/recipePetitions';
import RecipeDetail from '@/components/recipePage/RecipeDetail';
import Layout from '@/components/additional/Layout';
import AuthGuard from '@/components/additional/AuthGuard';

const Recipe = ({ recipe }) => {
    const router = useRouter();

    useEffect(() => {
        if (!recipe) {
            router.push('/cookerycorner/main');
        }
    }, []);

    return (
        recipe && (
            <AuthGuard>
                <Layout>
                    <RecipeDetail recipe={recipe} />
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
