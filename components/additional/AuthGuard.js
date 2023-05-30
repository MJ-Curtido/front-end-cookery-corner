import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const AuthGuard = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token') && localStorage.getItem('token') !== '';
        
        if (!isAuthenticated) {
            router.push('/');
        }
    }, []);

    return <>{children}</>;
};

export default AuthGuard;
