const baseUrl = 'http://127.0.0.1:3007/';

export const getIsBought = async (idRecipe, token) => {
    try {
        const response = await fetch(`http://127.0.0.1:3007/purchases/${idRecipe}`, {
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

export const getPurchasedRecipes = async (page, token) => {
    try {
        const response = await fetch(`${baseUrl}purchases?page=${page}`, {
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

        data.recipes.forEach((recipe) => {
            if (recipe.images && recipe.images.length > 0) {
                recipe.images.forEach((image, index) => {
                    recipe.images[index] = `${baseUrl}${image}`;
                });
            }
        });

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { message: 'There is something wrong.', status: 500 };
        }
    }
};

export const searchPurchasedRecipes = async (page, search, token) => {
    try {
        const response = await fetch(`${baseUrl}purchases/search/${search}?page=${page}`, {
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

        console.log(data);

        data.recipes.forEach((recipe) => {
            recipe.images.forEach((image, index) => {
                recipe.images[index] = `${baseUrl}${image}`;
            });
        });

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { message: 'There is something wrong.', status: 500 };
        }
    }
};

export const buyRecipe = async (idRecipe, token) => {
    try {
        const response = await fetch(`${baseUrl}purchases/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ recipe: idRecipe }),
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
