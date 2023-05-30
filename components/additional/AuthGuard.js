import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const AuthGuard = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('token') || !localStorage.getItem('my-app-storage')) {
            router.push('/');
        }
    }, []);

    return <>{children}</>;
};

export default AuthGuard;
