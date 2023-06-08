//#region Imports
import React, { useState } from 'react';
import { getUser } from '@/api/userPetitions';
import AuthGuard from '@/components/additional/AuthGuard';
import Layout from '@/components/additional/Layout';
import { getRecipesByUser } from '@/api/recipePetitions';
import UserDetail from '@/components/userPage/UserDetail/UserDetail';
import RecipesCardsList from '@/components/common/RecipesCardsList/RecipesCardsList';
//#endregion

const User = ({ user, recipes }) => {
    const [recipesList, setRecipesList] = useState(recipes);
    console.log(recipesList);

    return (
        <AuthGuard>
            <Layout>
                <UserDetail user={user} />

                <RecipesCardsList recipes={recipesList} />
            </Layout>
        </AuthGuard>
    );
};

export async function getServerSideProps(context) {
    try {
        const { iduser } = context.query;
        const token = context.req.cookies.token;

        const user = await getUser(iduser, token);

        const recipes = await getRecipesByUser(iduser, 1, token);
        const pages = Math.ceil(recipes.totalRecipes / 10);

        return {
            props: {
                user: user,
                recipes: recipes.recipes,
                pages: pages,
            },
        };
    } catch (error) {
        return {
            props: {
                user: null,
            },
        };
    }
}

export default User;
