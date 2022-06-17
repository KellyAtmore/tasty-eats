import { storage } from "./firebase";
import axios from "axios";
import React, { Component } from "react";
import { useState, useEffect } from "react";
// import {BrowserRouter, Link} from "react-router-dom"
import './App.css';
import Header from "./components/Header";
import RecipePreview from "./components/RecipePreview";
import CreateRecipe from "./components/CreateRecipe";

import Sidebar from "./components/Sidebar";
// import SearchRecipe from "./components/SearchRecipe";
import RecipeCard from "./components/RecipeCard";
import FavoritePage from "./components/FavoritePage";

function App() {
  const [state, setState] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [pageState, setPageState] = useState('initial');

  useEffect(() => {
    axios
      .get(`/api`)
      .then((res) => {
        const data = res.data;
      setState(data);
      
    })

  }, []);

const removeRecipe = (id) => {
  const newState = [...state]
  setState(newState.filter(recipe => recipe.id !== id));
}

const editRecipe = (id) => {

}

  const filterRecipe = () => {
    if (searchValue === "") return state;
    return state.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const filteredRecipe = filterRecipe();
  // const updateRecipe = 
  // call server endpoint to get the data with search value

  // console.log("title", a.title)
  // console.log("time", recipe.prep_time)

  // if (selectedRecipe) {
  //   return <RecipeCard recipe={selectedRecipe} />
  // }

  const content = () => {
    if (pageState === 'editRecipe') return <CreateRecipe recipe={selectedRecipe} />;
    if (selectedRecipe) return <RecipeCard recipe={selectedRecipe} />;
    if (pageState === 'createRecipe') return <CreateRecipe />;
    if (pageState === 'myRecipes') {

      // handling my recipes button
      return filteredRecipe.filter((recipe) => recipe.user_id === 1).map((recipe) => (
        <RecipePreview setPageState={setPageState} recipe={recipe} onRecipeClick={setSelectedRecipe} isMyRecipe={true} />
      ));
    }

    // handling favorite page
    if (pageState === 'favorites') {
      return <FavoritePage filteredRecipe = {filteredRecipe} onRecipeClick={setSelectedRecipe}  />
    }
    return filteredRecipe.map((recipe) => (
      <RecipePreview editRecipe={editRecipe} removeRecipe={removeRecipe} recipe={recipe} onRecipeClick={setSelectedRecipe} isMyRecipe={recipe.user_id === 1} /> 
    ));
  }
  
  const onSidebarChange = (value) => {
    setSelectedRecipe(null);
    setPageState(value);
  }

  return (
    <div className="bg-oatmeal App">
      <Header onSearchValueChanged={setSearchValue} />
      <div className="flex flex-wrap">
      <Sidebar onSidebarChange={onSidebarChange} />

      <div className="flex flex-wrap flex-1">{content()}</div>
       </div>
    </div>
  );
}

export default App;
