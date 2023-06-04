import React, { useState } from 'react';
import AuthGuard from '@/components/additional/AuthGuard';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import Layout from '@/components/additional/Layout';
import ListRecipesCards from '@/components/common/ListRecipesCards/ListRecipesCards';
import { recipesAvailable, searchRecipes } from '@/api/recipePetitions';
import Cookies from 'universal-cookie';

const Main = ({ recipes }) => {
    const cookies = new Cookies();
    const [recipesList, setRecipesList] = useState(recipes);
    const token = cookies.get('token');

    const search = async (search) => {
        if (search === '') {
            const recipes = await recipesAvailable(1, token);
            setRecipesList(recipes);
        } else {
            const recipes = await searchRecipes(1, search, token);
            setRecipesList(recipes);
        }
    };

    return (
        <AuthGuard>
            <Layout>
                <SearchBar onSearch={search} />

                <ListRecipesCards recipes={recipesList} />
            </Layout>
        </AuthGuard>
    );
};

export async function getServerSideProps({ req }) {
    try {
        const token = req.cookies.token;
        const recipes = await recipesAvailable(1, token);

        return {
            props: {
                recipes,
            },
        };
    } catch (error) {
        return {
            props: {
                recipes: [],
            },
        };
    }
}

export default Main;
