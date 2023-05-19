import { create } from 'zustand';

export const userStore = create((set) => ({
    // Initial state
    user: null,

    // Actions
    signin: async (name, email, password, telephone) => {
        try {
            const response = await fetch('http://127.0.0.1:3007/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, telephone }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();

            set({ user: data.user });

            localStorage.setItem('token', data.token);
        } catch (error) {
            console.log(error);
        }
    },

    login: async (email, password) => {
        try {
            const response = await fetch('http://127.0.0.1:3007/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();

            set({ user: data.user });

            localStorage.setItem('token', data.token);
        } catch (error) {
            console.log(error);
        }
    },

    logout: async () => {
        try {
            const response = await fetch('http://127.0.0.1:3007/users/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            set({ user: null });

            localStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }
    },

    updateUser: async (name, email, password, telephone) => {
        try {
            const requestData = {};

            if (name && name !== '') {
                requestData.name = name;
            }
            if (email && email !== '') {
                requestData.email = email;
            }
            if (password && password !== '') {
                requestData.password = password;
            }
            if (telephone && telephone !== '') {
                requestData.telephone = telephone;
            }

            const response = await fetch('http://127.0.0.1:3007/users/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            
            const data = await response.json();
            
            set({ user: data });
        } catch (error) {
            console.log(error);
        }
    },

    deleteUser: async () => {
        try {
            const response = await fetch('http://127.0.0.1:3007/users/me', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            set({ user: null });

            localStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }
    },
}));
