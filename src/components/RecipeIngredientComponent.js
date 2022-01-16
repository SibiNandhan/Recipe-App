import React from "react";

export default function RecipeIngredientComponent({
  ingredient,
  handleIngredientChange,
  handleIngredientDelete,
}) {
  function handleChange(changes) {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
  }
  function handleIngredientsDelete() {
    handleIngredientDelete(ingredient.id);
  }
  return (
    <div>
      <label className="recipe-edit__label" htmlFor="name">
        Name
      </label>
      <input
        className="recipe-edit__input"
        type="text"
        name="name"
        id="name"
        value={ingredient.name}
        onInput={(e) => handleChange({ name: e.target.value })}
      />
      <label className="recipe-edit__label" htmlFor="amount">
        Amount
      </label>
      <input
        className="recipe-edit__input"
        type="text"
        name="amount"
        id="amount"
        value={ingredient.amount}
        onInput={(e) => handleChange({ amount: e.target.value })}
      />
      <button
        style={{ marginLeft: "300px", marginTop: "15px" }}
        className="btn btn--danger "
        onClick={() => handleIngredientsDelete()}
      >
        &times;
      </button>
    </div>
  );
}
