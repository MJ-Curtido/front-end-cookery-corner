//#region Imports
import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import CSS from './RecipesCardsList.module.css';
//#endregion

const RecipesCardsList = ({ recipes }) => {
    return (
        <div className={CSS.container}>
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe._id}
                    id={recipe._id}
                    title={recipe.title}
                    image={recipe.images[0]}
                    description={recipe.description}
                    author={recipe.author}
                    valuation={recipe.valuation}
                />
            ))}
        </div>
    );
};

export default RecipesCardsList;
