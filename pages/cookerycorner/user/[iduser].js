//#region Imports
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { getUser } from '@/api/userPetitions';
import AuthGuard from '@/components/additional/AuthGuard';
import Layout from '@/components/additional/Layout';
import { getRecipesByUserDate, getRecipesByUserValuation } from '@/api/recipePetitions';
import UserDetail from '@/components/userPage/UserDetail/UserDetail';
import RecipesCardsList from '@/components/common/RecipesCardsList/RecipesCardsList';
import { Pagination, Typography } from '@mui/material';
//#endregion

const User = ({ user, recipes, pages }) => {
    //#region Elements
    const cookies = new Cookies();
    const router = useRouter();
    const [recipesList, setRecipesList] = useState(recipes);
    const [totalPages, setTotalPages] = useState(pages);
    const [page, setPage] = useState(1);
    const [type, setType] = useState(0); // 0 = Valuation, 1 = Date
    //#endregion

    useEffect(() => {
        if (!user) {
            router.push('/cookerycorner/main');
        }
    }, []);

    useEffect(() => {
        onChangePage();
    }, [page]);

    //#region Functions
    const onChangePage = async () => {
        if (type === 0) {
            const obj = await getRecipesByUserValuation(page, user._id, cookies.get('token'));
            setRecipesList(obj.recipes);
        } else {
            const obj = await getRecipesByUserDate(page, user._id, cookies.get('token'));
            setRecipesList(obj.recipes);
        }
    };

    const recipesByValuation = async () => {
        const obj = await getRecipesByUserValuation(1, user._id, cookies.get('token'));
        setRecipesList(obj.recipes);
        setTotalPages(Math.ceil(obj.totalRecipes / 10));
        setPage(1);
        setType(0);
    };

    const recipesByDate = async () => {
        const obj = await getRecipesByUserDate(1, user._id, cookies.get('token'));
        setRecipesList(obj.recipes);
        setTotalPages(Math.ceil(obj.totalRecipes / 10));
        setPage(1);
        setType(1);
    };

    const paginationHandler = (event, value) => {
        setPage(value);
    };
    //#endregion

    return (
        <AuthGuard>
            <Layout>
                <UserDetail user={user} onOrderByValuation={recipesByValuation} onOrderByDate={recipesByDate} />

                {recipesList.length > 0 ? (
                    <RecipesCardsList recipes={recipesList} />
                ) : (
                    <Typography variant="h4" style={{ textAlign: 'center', color: '#424242', marginBottom: '70px' }}>
                        You haven't created any recipe yet.
                    </Typography>
                )}

                <div style={CSS.paginationDiv}>
                    <Pagination count={totalPages} color="secondary" variant="outlined" shape="rounded" onChange={paginationHandler} />
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

export async function getServerSideProps(context) {
    try {
        const { iduser } = context.query;
        const token = context.req.cookies.token;

        const user = await getUser(iduser, token);

        const recipes = await getRecipesByUserValuation(1, iduser, token);
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
