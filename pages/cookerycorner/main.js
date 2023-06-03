import React from 'react';
import AuthGuard from '@/components/additional/AuthGuard';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import Layout from '@/components/additional/Layout';
import ListRecipesCards from '@/components/common/ListRecipesCards/ListRecipesCards';
import { recipesAvailable } from '@/api/recipePetitions';

const Main = ({ recipes }) => {
    return (
        <AuthGuard>
            <Layout>
                <SearchBar />

                <ListRecipesCards recipes={recipes} />
            </Layout>
        </AuthGuard>
    );
};

export async function getServerSideProps() {
    // try {
    //     const recipes = await recipesAvailable(1);

    //     return {
    //         props: {
    //             recipes,
    //         },
    //     };
    // } catch (error) {
        return {
            props: {
                recipes: [],
            },
        };
    // }
}

export default Main;

//TODO: esto está por terminar
