import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import FormRegister from '@/components/registerPage/FormRegister';

const Register = () => {
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('my-app-storage')) {
            router.push('/cookerycorner/main');
        }
    }, []);

    return (
        <>
            <FormRegister />
        </>
    );
};

export default Register;
