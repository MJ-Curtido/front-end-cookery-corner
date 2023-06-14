//#region Imports
import React from 'react';
import { getRecipe } from '@/api/recipePetitions';
import Layout from '@/components/additional/Layout';
import AuthGuard from '@/components/additional/AuthGuard';
import FormUpdate from '@/components/updatePage/FormUpdate/FormUpdate';
//#endregion

const Recipe = ({ recipe }) => {
    return (
        recipe && (
            <AuthGuard>
                <Layout>
                    <FormUpdate recipe={recipe} />
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
