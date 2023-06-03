import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import FormLogin from '@/components/loginPage/FormLogin';
import Cookies from 'universal-cookie';

export default function Home() {
    const router = useRouter();
    const cookies = new Cookies();

    useEffect(() => {
        if (cookies.get('token')) {
            router.push('/cookerycorner/main');
        }
    }, []);

    return (
        <>
            <FormLogin />
        </>
    );
}
