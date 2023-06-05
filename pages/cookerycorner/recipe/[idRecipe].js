import React from 'react';
import { useRouter } from 'next/router';

const Recipe = (props) => {
    const router = useRouter();

    const { idRecipe } = router.query;

    return (
        <div>
            <h1>Recipe</h1>
            <p>Recipe ID: {idRecipe}</p>
        </div>
    );
};

export default Recipe;
