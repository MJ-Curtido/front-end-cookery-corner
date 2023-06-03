import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import FormRegister from '@/components/registerPage/FormRegister';
import Cookies from 'universal-cookie';

const Register = () => {
    const router = useRouter();
    const cookies = new Cookies();

    useEffect(() => {
        if (cookies.get('token')) {
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
