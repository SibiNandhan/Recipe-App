import React, { useContext } from "react";
import Ingredient from "./Ingredient";
import RecipeIngredientComponent from "./RecipeIngredientComponent";
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from "uuid";
export default function RecipeEdit({ recipe }) {
  const {
    handleRecipeChange,
    handleRecipeSelect,
    handleAddNewIngredient,
    handleDeleteIngredient,
  } = useContext(RecipeContext);
  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }
  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
  }
  function handleAddIngredient() {
    handleAddNewIngredient(recipe.id, { name: "", amount: "", id: uuidv4() });
  }
  function handleIngredientDelete(ingredientId) {
    handleDeleteIngredient(recipe.id, ingredientId);
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button
          onClick={() => handleRecipeSelect(undefined)}
          className="btn recipe-edit__remove-button"
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label className="recipe-edit__label" htmlFor="name">
          Name
        </label>
        <input
          className="recipe-edit__input"
          type="text"
          name="name"
          id="name"
          value={recipe.name}
          onInput={(e) => handleChange({ name: e.target.value })}
        ></input>
        <label className="recipe-edit__label" htmlFor="cookTime">
          Cook Time
        </label>
        <input
          className="recipe-edit__input"
          type="text"
          name="cookTime"
          id="cookTime"
          value={recipe.cookTime}
          onInput={(e) => handleChange({ cookTime: e.target.value })}
        ></input>
        <label className="recipe-edit__label" htmlFor="servings">
          Servings
        </label>
        <input
          className="recipe-edit__input"
          type="number"
          min="1"
          name="servings"
          id="servings"
          value={recipe.servings}
          onInput={(e) =>
            handleChange({ servings: parseInt(e.target.value) || "" })
          }
        ></input>
        <label className="recipe-edit__label" htmlFor="instructions">
          Instruction
        </label>
        <textarea
          name="instructions"
          className="recipe-edit__input"
          id="instructions"
          value={recipe.instruction}
          onInput={(e) => handleChange({ instruction: e.target.value })}
        />
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>

      {recipe.ingredients.map((ingredient) => {
        return (
          <RecipeIngredientComponent
            key={ingredient.id}
            ingredient={ingredient}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
          />
        );
      })}

      <div className="recipe-edit__add-ingredient-btn-container">
        <button
          className="btn btn--primary"
          onClick={() => handleAddIngredient()}
        >
          Add Ingredients
        </button>
      </div>
    </div>
  );
}
