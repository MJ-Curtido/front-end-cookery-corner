import { create } from 'zustand';

export const recipeStore = create((set) => ({
    // Initial state
    recipes: null,

    // Actions
    createRecipe: async (title, images, description, ingredients, steps, price, author, valuation, reviews) => {
        try {
            
        } catch (error) {
            
        }
    }
}));
