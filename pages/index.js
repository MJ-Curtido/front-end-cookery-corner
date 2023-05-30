import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import FormLogin from '@/components/loginPage/FormLogin';
// import { userStore } from '@/store/userStore';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('my-app-storage')) {
            router.push('/cookerycorner/main');
        }
    }, []);

    return (
        <>
            <FormLogin />
        </>
    );
}
