const baseUrl = 'http://127.0.0.1:3007/';

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

export const searchRecipes = async (page, search, token) => {
    try {
        const response = await fetch(`${baseUrl}recipes/search/${search}?page=${page}`, {
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

export const getRecipe = async (idRecipe, token) => {
    try {
        const response = await fetch(`${baseUrl}recipes/${idRecipe}`, {
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

        data.images.forEach((image, index) => {
            data.images[index] = `${baseUrl}${image}`;
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

export const getIsMine = async (idRecipe, token) => {
    try {
        const response = await fetch(`${baseUrl}recipes/me/${idRecipe}`, {
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
    try {
        const response = await fetch(`${baseUrl}recipes/${idRecipe}/review`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(review),
        });

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

export const getRecipesByUserValuation = async (page, idUser, token) => {
    try {
        const response = await fetch(`${baseUrl}recipes/user/valuation/${idUser}?page=${page}`, {
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

export const getRecipesByUserDate = async (page, idUser, token) => {
    try {
        const response = await fetch(`${baseUrl}recipes/user/date/${idUser}?page=${page}`, {
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

export const createRecipe = async (recipe, token) => {
    try {
        const formData = new FormData();
        formData.append('title', recipe.title);
        formData.append('description', recipe.description);
        formData.append('price', recipe.price);

        recipe.images.forEach((image, index) => {
            formData.append('images', image);
        });

        recipe.ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][name]`, ingredient.name);
            formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
            if (ingredient.unit) {
                formData.append(`ingredients[${index}][unit]`, ingredient.unit);
            }
        });

        recipe.steps.forEach((step, index) => {
            formData.append('steps', step);
        });

        const response = await fetch('${baseUrl}recipes/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
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

export const editRecipe = async (idRecipe, recipe, token) => {
    try {
        const formData = new FormData();
        formData.append('title', recipe.title);
        formData.append('description', recipe.description);
        formData.append('price', recipe.price);

        recipe.images.forEach((image, index) => {
            formData.append('images', image);
        });

        recipe.ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][name]`, ingredient.name);
            formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
            if (ingredient.unit) {
                formData.append(`ingredients[${index}][unit]`, ingredient.unit);
            }
        });

        recipe.steps.forEach((step, index) => {
            formData.append('steps', step);
        });

        const response = await fetch(`${baseUrl}recipes/${idRecipe}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
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
