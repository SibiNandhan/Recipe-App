import React, { useState, createContext, useEffect } from "react";
import RecipeList from "./RecipeList";
import { v4 as uuidv4 } from "uuid";
import RecipeEdit from "./RecipeEdit";

export const RecipeContext = createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.react";
const App = () => {
  const [recipes, setRecipes] = useState(sampleRecipes);
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON) setRecipes(JSON.parse(recipeJSON));
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);
  const [selectedRecipeId, setSelectedRecipeId] = useState();

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleAddNewIngredient,
    handleDeleteIngredient,
  };
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "New",
      servings: 1,
      cookTime: "",
      instruction: "",
      ingredients: [{ id: uuidv4(), name: "", amount: "" }],
    };
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }
  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }
  function handleRecipeChange(id, recipe) {
    const newRecipe = [...recipes];
    const index = recipes.findIndex((r) => r.id === id);
    newRecipe[index] = recipe;
    setRecipes(newRecipe);
  }
  function handleAddNewIngredient(id, newIngredient) {
    const newRecipe = [...recipes];
    const index = recipes.findIndex((r) => r.id === id);
    newRecipe[index].ingredients.push(newIngredient);
    setRecipes(newRecipe);
  }
  function handleDeleteIngredient(recipeid, ingredientid) {
    let newRecipe = [...recipes];
    const index = newRecipe.findIndex((r) => r.id === recipeid);
    console.log(index);
    const ingredient = newRecipe[index].ingredients.filter(
      (i) => i.id !== ingredientid
    );
    newRecipe[index].ingredients = ingredient;
    setRecipes(newRecipe);
  }

  return (
    <>
      <RecipeContext.Provider value={recipeContextValue}>
        <RecipeList recipes={recipes} />
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe}></RecipeEdit>}
      </RecipeContext.Provider>
    </>
  );
};

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1.45",
    instruction:
      "1.Put salt on Chicken\n2. Put the chicken\n3. Eat the chicken ",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "5 pound",
      },
    ],
  },
  {
    id: 2,
    name: "Samosa Chicken",
    servings: 4,
    cookTime: "5.45",
    instruction:
      "1.Put salt on Samosa\n2. Put the chicken\n3. Eat the chicken ",
    ingredients: [
      {
        id: 1,
        name: "Samosa",
        amount: "6 pounds",
      },
      {
        id: 2,
        name: "sugar",
        amount: "3 pound",
      },
    ],
  },
];

export default App;
