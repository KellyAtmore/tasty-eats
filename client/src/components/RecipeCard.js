import React from "react";
import { useState, useEffect } from "react";
import FavRecipe from "./FavRecipe";
// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import axios from "axios";

export default function RecipeCard(props) {
  const { title, prep_time, portion_size, image, directions, ingredient, id: recipe_id, user_id } =
    props.recipe || {};
  const ingredientArray = ingredient.split("\n");
  const directionsArray = directions.split("\n");
  // console.log("DIRECTIONS", ingredientArray);
  // const onClick = () => {
  //   props.onRecipeClick(props.recipe);
  // };

  // empty object

  const [isSaved, setIsSaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/favorites/${props.recipe.id}`).then((res) => {
      const data = res.data;
      setIsSaved(data.isSaved);
      setIsLoaded(true);
    })
  }, []);

  function handleFavRecipe(events) {
    console.log("props", props.recipe);
    if (!isLoaded) {
      return;
    }
    if (isSaved) {
      axios.delete(`http://localhost:8001/api/favorites/${props.recipe.id}`).then((res) => {
        //api call to server to then fav or unfav a recipe
        //will probs need recipe ID
        //will need logic before API call if fav or not
        console.log('res delete', res);
        setIsSaved(!(res.data.message === 'success'));
      });
    } else {
      const body = { user_id: 2, recipe_id: props.recipe.id };
      axios.post(`http://localhost:8001/api/favorites`, body).then((res) => {
        //api call to server to then fav or unfav a recipe
        //will probs need recipe ID
        //will need logic before API call if fav or not
        console.log('res save', res);
        setIsSaved(res.data.message === 'success');
      });
    }
  }

  return (
    <div className="full_recipe">
       
      <div className=" bg-sunset rounded-[20px]  p-10 m-5 outline outline-offset-2outline-charcoal shadow-[8px_8px_#AE574D]">
      <FavRecipe onClick={handleFavRecipe} isFav={isSaved} />
        <div className="flex justify-center">
       
          <div className="flex-wrap">
            <img src={image} alt="..." className="full_recipe_img" />
          </div>
        </div>
        <div class="title-single">
          <h1 className="text-[#FCD6A8] font-medium">{title}</h1>
        </div>

        {/* <div>
          <p className="text-oatmeal text-sm">{prep_time}</p>
          <p className="text-oatmeal text-sm pb-10">{portion_size}</p>
        </div> */}

        <div className="recipe_details flex">
          <img className="icon" src="../icons/stopwatch.png" alt="" />
          <p className="text-oatmeal text-sm">{prep_time}</p>
        </div>

        <div className="flex">
          <img className="icon" src="../icons/user.png" alt="" />
          <p className="text-oatmeal text-sm ">{portion_size}</p>
        </div>

        <br></br>

        <h1 className="text-[#FCD6A8] font-medium text-xl pb-2">Ingredients</h1>
        <ul>
          {ingredientArray.map((ingredientItem) => {
            return <li className="text-oatmeal">{ingredientItem}</li>;
          })}
        </ul>
        <br></br>
        <h1 className="text-[#FCD6A8] font-medium text-xl pb-2">Directions</h1>
        <ul className="text-oatmeal font-sm">
          {directionsArray.map((directionItem) => {
            return <li>{directionItem}</li>;
          })}
        </ul>
        {/* <h1 className="text-oatmeal font-medium">{directions}</h1> */}

        
      </div>
    </div>
  );
}
