import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function InstructionCard({showRecipe,setShowRecipe,onClose})
{
    const [details,setDetails]=useState({
        summary:null,
        ingredients:null,
        equipment:null,
        steps:{
            nos:null,
            step:null,
        }
    })
    const api_key="5dfde382d5c14fbf9314b9e895832c71";
    const url1=`https://api.spoonacular.com/recipes/${showRecipe.id}/summary?apiKey=${api_key}`;
    const url2=`https://api.spoonacular.com/recipes/${showRecipe.id}/analyzeInstructions?apiKey=${api_key}`;
    
    useEffect(()=>
    {
        async function handleDataFetching()
        {
            const sum=await fetch(url1);
            const data1=await then(res=>res.json());
            const ana=await fetch(url2)
            const data2=await then(res=>res.json())
            
        }handleDataFetching();
    })


    return <>
        <button 
        type="button" 
        onClick={onClose}
        className="text-3xl cursor-pointer shadow inline-flex w-16
        h-12 border-transparent hover:bg-gray-200 hover:shadow-4xl rounded-4xl p-4 py-2.5 mx-3 hover:scale-110 transition-transform cursor-pointer "
        ><IoCloseOutline/></button>


    </>
}