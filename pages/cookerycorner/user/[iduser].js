import React from 'react';
import { useRouter } from 'next/router';

const User = () => {
    const router = useRouter();
    const { iduser } = router.query;

    return (
        <div>
            <h1>User</h1>
            <p>User ID: {iduser}</p>
        </div>
    );
};

export default User;
