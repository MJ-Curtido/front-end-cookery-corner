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
