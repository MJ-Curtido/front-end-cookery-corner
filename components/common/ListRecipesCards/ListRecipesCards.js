import React, { useState } from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import CSS from './ListRecipesCards.module.css';

const ListRecipesCards = ({ recipes }) => {
    const [recipesList, setRecipesList] = useState(recipes);

    return (
        <div className={CSS.container}>
            {recipesList.map((recipe) => (
                <RecipeCard
                    key={recipe._id}
                    title={recipe.title}
                    image={recipe.images[0]}
                    description={recipe.description}
                    author={recipe.author}
                    valuation={recipe.valuation}
                />
            ))}

            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
        </div>
    );
};

export default ListRecipesCards;

//TODO: esto está por terminar
