//#region Imports
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import FormLogin from '@/components/loginPage/FormLogin/FormLogin';
import Cookies from 'universal-cookie';
//#endregion

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
