//#region Imports
import React, { useEffect, useState } from 'react';
import AuthGuard from '@/components/additional/AuthGuard';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import Layout from '@/components/additional/Layout';
import ListRecipesCards from '@/components/common/ListRecipesCards/ListRecipesCards';
import { recipesAvailable, searchRecipes } from '@/api/recipePetitions';
import Cookies from 'universal-cookie';
import { Pagination, Typography } from '@mui/material';
//#endregion

const Main = ({ recipes, pages }) => {
    //#region Elements
    const cookies = new Cookies();
    const [recipesList, setRecipesList] = useState(recipes);
    const [totalPages, setTotalPages] = useState(pages);
    const [page, setPage] = useState(1);
    const [searching, setSearching] = useState(false);
    const [searchWords, setSearchWords] = useState('');
    const token = cookies.get('token');
    //#endregion

    useEffect(() => {
        onChangePage();
    }, [page]);

    //#region Functions
    const onChangePage = async () => {
        if (searching) {
            const obj = await searchRecipes(page, searchWords, token);
            setRecipesList(obj.recipes);
        } else {
            const obj = await recipesAvailable(page, token);
            setRecipesList(obj.recipes);
        }
    };

    const paginationHandler = (event, value) => {
        console.log('value', value);
        setPage(value);
    };

    const search = async (search) => {
        setSearchWords(search);

        if (search === '') {
            const obj = await recipesAvailable(page, token);
            setRecipesList(obj.recipes);
            setTotalPages(Math.ceil(obj.totalRecipes / 10));
            setPage(1);
            setSearching(false);
        } else {
            try {
                const obj = await searchRecipes(page, search, token);
                setRecipesList(obj.recipes);
                setTotalPages(Math.ceil(obj.totalRecipes / 10));
                setPage(1);
                setSearching(true);
            } catch (error) {
                setRecipesList([]);
                setTotalPages(1);
                setPage(1);
            }
        }
    };
    //#endregion

    return (
        <AuthGuard>
            <Layout>
                <SearchBar onSearch={search} />

                {recipesList.length === 0 ? (
                    <Typography variant="h4" style={{ textAlign: 'center', color: '#424242', marginBottom: '70px' }}>
                        No recipes found.
                    </Typography>
                ) : (
                    <ListRecipesCards recipes={recipesList} />
                )}

                <div style={CSS.paginationDiv}>
                    <Pagination count={totalPages} color="primary" variant="outlined" shape="rounded" onChange={paginationHandler} />
                </div>
            </Layout>
        </AuthGuard>
    );
};

const CSS = {
    paginationDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '70px',
    },
};

export async function getServerSideProps({ req }) {
    try {
        const token = req.cookies.token;
        const obj = await recipesAvailable(1, token);

        return {
            props: {
                recipes: obj.recipes,
                pages: Math.ceil(obj.totalRecipes / 10),
            },
        };
    } catch (error) {
        return {
            props: {
                recipes: [],
                pages: 1,
            },
        };
    }
}

export default Main;
