import FormLogin from '@/components/loginPage/FormLogin';
import React from 'react';
// import { userStore } from '@/store/userStore';

export default function Home() {
    return (
        <>
            <FormLogin />
        </>
    );
}

// export async function getServerSideProps() {
//     const getUser = userStore.getState().getUser;

//     await getUser();

//     const user = userStore.getState().user;
//     console.log(user);

//     return {
//         props: { user },
//     };
// }
