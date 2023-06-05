//#region Imports
import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import CSS from './ListRecipesCards.module.css';
//#endregion

const ListRecipesCards = ({ recipes }) => {
    //TODO:recipe.author solo me trae el nombre, y requiero del id, así que manu dle futuro has magia bro para obtnerlo y así poder mostrar las recetas de ese usuario cuando alguien quiera entrar en su perfil

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

export default ListRecipesCards;
