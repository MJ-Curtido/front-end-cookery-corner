export const getUser = async (iduser, token) => {
    try {
        const response = await fetch(`http://127.0.0.1:3007/users/${iduser}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
};
