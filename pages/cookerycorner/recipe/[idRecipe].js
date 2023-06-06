import React from 'react';
import { useRouter } from 'next/router';

const Recipe = () => {
    const router = useRouter();

    const { idrecipe } = router.query;

    return (
        <div>
            <h1>Recipe</h1>
            <p>Recipe ID: {idrecipe}</p>
        </div>
    );
};

export default Recipe;
