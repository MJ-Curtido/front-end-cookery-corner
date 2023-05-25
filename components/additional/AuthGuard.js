import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { userStore } from '@/store/userStore';

const AuthGuard = ({ children }) => {
    const router = useRouter();

    //TODO: implementar en el userStore el método de obtener usuario, y utilizarlo aquí para si existe token, que rellene el usuario de la store
    const isAuthenticated = localStorage.getItem('token') && localStorage.getItem('token') !== '';

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        }
        else {

        }
    }, []);

    return <>{children}</>;
};

export default AuthGuard;
