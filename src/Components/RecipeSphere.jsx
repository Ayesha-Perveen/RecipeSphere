import { useState } from "react"
import SearchBox from "./SearchBox";
import Header from "./Header";
import RecipeList from "./RecipeList";

export default function RecipeSphere()
{
    const[searchEle,setSearchEle]=useState("pizza");
    const[data,setData]=useState([]);
    const[fav,setFav]=useState([]);


    return <>
        <Header />
        <SearchBox searchEle={searchEle} setSearchEle={setSearchEle} setData={setData}/>
        <RecipeList data={data} fav={fav} setFav={setFav}/>
    </>
}
