//#region Imports
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
//#endregion

const AuthGuard = ({ children }) => {
    const router = useRouter();
    const cookies = new Cookies();

    useEffect(() => {
        if (!cookies.get('token')) {
            router.push('/');
        }
    }, []);

    return <>{children}</>;
};

export default AuthGuard;
