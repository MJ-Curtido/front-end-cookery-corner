export const recipesAvailable = async (page, token) => {
    try {
        const response = await fetch(`http://127.0.0.1:3007/recipes/available?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw { message: errorData.error, status: response.status };
        }

        const data = await response.json();

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { message: 'There is something wrong.', status: 500 };
        }
    }
};

export const searchRecipes = async (page, search, token) => {
    try {
        const response = await fetch(`http://127.0.0.1:3007/recipes/search/${search}?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw { message: errorData.error, status: response.status };
        }

        const data = await response.json();

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { message: 'There is something wrong.', status: 500 };
        }
    }
};

export const getRecipe = async (idRecipe, token) => {
    try {
        const response = await fetch(`http://127.0.0.1:3007/recipes/${idRecipe}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw { message: errorData.error, status: response.status };
        }

        const data = await response.json();

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { message: 'There is something wrong.', status: 500 };
        }
    }
};

export const getIsMine = async (idRecipe, token) => {
    try {
        const response = await fetch(`http://127.0.0.1:3007/recipes/me/${idRecipe}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw { message: errorData.error, status: response.status };
        }

        const data = await response.json();

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { message: 'There is something wrong.', status: 500 };
        }
    }
};

export const pushReview = async (idRecipe, review, token) => {
    console.log(review);
    console.log(idRecipe);
    console.log(token);
    try {
        const response = await fetch(`http://127.0.0.1:3007/recipes/${idRecipe}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(review),
        });

        console.log(response.status);

        if (!response.ok) {
            const errorData = await response.json();
            throw { message: errorData.error, status: response.status };
        }
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { message: 'There is something wrong.', status: 500 };
        }
    }
};

export const getRecipesByUser = async (idUser, page, token) => {
    try {
        const response = await fetch(`http://127.0.0.1:3007/recipes/user/${idUser}?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw { message: errorData.error, status: response.status };
        }

        const data = await response.json();

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { message: 'There is something wrong.', status: 500 };
        }
    }
};
