import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";
  
function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods); 
  const [filterBy, setFilterBy] = useState("All"); 

  function increaseHeat(id) {
    const newFoodArray = foods.map(food =>
      (food.id === id) ? { ...food, heatLevel: food.heatLevel + 1 } : food
    )
    setFoods(newFoodArray)
  }

  function handleLiClick(id) {
    const deleteList = foods.filter(food => food.id !== id)
    setFoods(deleteList)
  }

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    console.log(newFood);
    let wholeList = foods.concat(newFood)
    console.log(wholeList)
    setFoods(wholeList)
  }


  function handleFilterChange(e) {
    setFilterBy(e.target.value)
  } 

   const foodsToDisplay = foods.filter((food) => {
    if (filterBy ==="All") {
      return true;
    } else {
      return food.cuisine === filterBy
    }
  })

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} >
      <h2 onClick ={()=>handleLiClick(food.id)}>{food.name}</h2>
      <p>Cuisine: {food.cuisine}</p>
      <p onClick = {()=> increaseHeat(food.id)}>heat: {food.heatLevel}</p>
    </li>
  ))

  return (
    <div>
       <select name="filter" onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="American">American</option>
          <option value="Sichuan">Sichuan</option>
          <option value="Thai">Thai</option>
          <option value="Mexican">Mexican</option>
        </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList
