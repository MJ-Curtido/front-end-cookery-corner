import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userStore = create(
    persist(
        (set) => ({
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
                        throw { message: errorData.error, status: response.status };
                    }
                    const data = await response.json();

                    set({ user: data.user });

                    localStorage.setItem('token', data.token);
                } catch (error) {
                    if (error.status) {
                        throw error;
                    } else {
                        throw { message: 'There is something wrong.', status: 500 };
                    }
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
                        throw { message: errorData.error, status: response.status };
                    }

                    const data = await response.json();

                    set({ user: data.user });

                    localStorage.setItem('token', data.token);
                } catch (error) {
                    if (error.status) {
                        throw error;
                    } else {
                        throw { message: 'There is something wrong.', status: 500 };
                    }
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
                        throw { message: errorData.error, status: response.status };
                    }

                    set({ user: null });

                    localStorage.removeItem('token');
                } catch (error) {
                    if (error.status) {
                        throw error;
                    } else {
                        throw { message: 'There is something wrong.', status: 500 };
                    }
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
                        throw { message: errorData.error, status: response.status };
                    }

                    const data = await response.json();

                    set({ user: data });
                } catch (error) {
                    if (error.status) {
                        throw error;
                    } else {
                        throw { message: 'There is something wrong.', status: 500 };
                    }
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
                        throw { message: errorData.error, status: response.status };
                    }

                    set({ user: null });

                    localStorage.removeItem('token');
                } catch (error) {
                    if (error.status) {
                        throw error;
                    } else {
                        throw { message: 'There is something wrong.', status: 500 };
                    }
                }
            },
        }),
        {
            name: 'my-app-storage'
        }
    )
);
