import { useState } from "react"
import SearchBox from "./SearchBox";
import Header from "./Header";
import RecipeList from "./RecipeList";

export default function RecipeSphere()
{
    const[searchEle,setSearchEle]=useState("");
    const[data,setData]=useState([]);
    const[fav,setFav]=useState([]);
    const[showRecipe,setShowRecipe]=useState(null);
    const[showWishList,setShowWishList]=useState(false);


    return <>
        <Header 
        fav={fav}
        setFav={setFav}
        showWishList={showWishList}
        setShowWishList={setShowWishList}
        showRecipe={showRecipe} 
        setShowRecipe={setShowRecipe}
        />
        <SearchBox 
        searchEle={searchEle} 
        setSearchEle={setSearchEle} 
        setData={setData}
        />
        <RecipeList 
        data={data} 
        fav={fav} 
        setFav={setFav} 
        showRecipe={showRecipe} 
        setShowRecipe={setShowRecipe}
        setShowWishList={setShowWishList}
        />
        
    </>
}
