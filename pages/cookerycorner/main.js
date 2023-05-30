import React from 'react';
import store from '@/store/store';
import { userStore } from '@/store/userStore';
import AuthGuard from '@/components/additional/AuthGuard';

const MainPage = () => {
    const user = store(userStore, (state) => state.user);

    return (
        <>
            <AuthGuard>
               <h1>{user && user.name}</h1> 
            </AuthGuard>
        </>
    );
};

export default MainPage;
