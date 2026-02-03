import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function InstructionCard({showRecipe,setShowRecipe,onClose})
{

    const [loading, setLoading] = useState(true);
    const [details,setDetails]=useState({
        summary:null,
        ingredients:null,
        equipment:null,
        steps:[]
    })
    //"a4ed99e7776b4a4fb4baade201ef6f17"
    //"5dfde382d5c14fbf9314b9e895832c71"
    const api_key="5dfde382d5c14fbf9314b9e895832c71";
    const url1=`https://api.spoonacular.com/recipes/${showRecipe.id}/summary?apiKey=${api_key}`;
    const url2=`https://api.spoonacular.com/recipes/${showRecipe.id}/analyzedInstructions?apiKey=${api_key}`;
    const url3=`https://api.spoonacular.com/recipes/${showRecipe.id}/information?includeNutrition=false&apiKey=${api_key}`;
    
    useEffect(()=>
    {
        if (!showRecipe || !showRecipe.id) return;
        async function handleDataFetching()
        {
            setLoading(true);
            try {
            const sum=await fetch(url1);
            const data1=await sum.json();
            const ana=await fetch(url2)
            const data2=await ana.json();
            const ing=await fetch(url3);
            const data3=await ing.json();
            
            const steps = data2[0]?.steps || [];

            setDetails({
            summary: data1.summary,
            steps: steps,
            equipment: [...new Set(steps.flatMap(s => s.equipment.map(e => e.name)))],
            ingredients:data3,
            });
            } catch (error) {
                console.error("Error fetching recipe data:", error);
            }
            finally {
                setLoading(false);
            }

        }handleDataFetching();
    }, [showRecipe.id]);


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center  w-full h-screen  fixed inset-0 z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
                <p className="text-gray-500 font-medium animate-pulse">Cooking up instructions...</p>
            </div>
        );
    }

    return (
    <div className="fixed inset-0 z-50 p-8 bg-white w-full h-screen overflow-y-auto shadow-xl ">
        
        <button 
            type="button" 
            onClick={onClose}
            className="text-3xl cursor-pointer shadow inline-flex items-center justify-center w-12 h-12 
            bg-gray-100 border-transparent hover:bg-gray-200 rounded-full 
            hover:scale-110 transition-transform absolute top-4 right-4"
        >
            <IoCloseOutline/>
        </button>

        <div className="max-w-5xl mx-auto mt-10">
            
            <div className="flex items-center justify-between p-4 ">
                <h3 className="p-2 font-semibold text-4xl">{showRecipe.title}</h3>
                <img src={showRecipe.image} alt="food image" className="p-2 mx-2 rounded-3xl" />
            </div>
            <div className="grid grid-cols-4 gap-3 mb-7">
                <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                    <p className="text-xs text-orange-600 font-bold uppercase">Ready in</p>
                    <p className="text-lg font-semibold">{details.ingredients.readyInMinutes} Min</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <p className="text-xs text-blue-600 font-bold uppercase">Servings</p>
                    <p className="text-lg font-semibold">{details.ingredients.servings} People</p>
                </div>
                <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                    <p className="text-xs text-green-600 font-bold uppercase">Price/Serving</p>
                    <p className="text-lg font-semibold">${(details.ingredients.pricePerServing/100).toFixed(2)}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                    <p className="text-xs text-purple-600 font-bold uppercase">Diet</p>
                    <p className="text-lg font-semibold">{details.ingredients.vegetarian ? "Veg" : "Non-Veg"}</p>
                </div>
            </div>

            <div className="shadow-sm mb-7 p-4">
                <h4 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-orange-500 rounded-full"></span> Summary
            </h4>
            {details.summary && (
                <div 
                    className="text-gray-800 p-2 mb-2 text-lg"
                    dangerouslySetInnerHTML={{ __html: details.summary }} 
                />
            )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <div>
                    <div className="m-2 my-6">
                        <h2 className="text-3xl m-2 font-semibold flex">
                            <span className="w-2 h-8 bg-orange-500 rounded-full mx-2"></span>
                            Equipments needed : </h2>
                        {details.equipment && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {details.equipment.map((it) => (
                            <span key={it} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                            {it}
                            </span>
                            ))}
                        </div>
                        )}
                    </div>
                    <div className="m-2 my-8">
                        <h2 className="text-3xl m-2 font-semibold flex">
                            <span className="w-2 h-8 bg-orange-500 rounded-full mx-2"></span>
                            Ingredients needed : </h2>
                        <ul  className=" m-2 px-3 py-1 text-sm rounded-xl bg-gray-800 text-white">
                            {details.ingredients.extendedIngredients && (
                            <div className="mt-2">
                                {details.ingredients.extendedIngredients.map((det) => (
                                <li key={det.id || det.name} className="p-1">
                                    <b>{det.name}</b> : {det.original}
                                </li>
                                ))}
                            </div>
                            )}
                        </ul>
                    </div>
                </div>
                
                <div className="m-2 my-4">
                    <h2 className="text-3xl m-2 font-semibold flex">
                        <span className="w-2 h-8 bg-orange-500 rounded-full mx-2"></span>Steps : </h2>
                    {details.steps && (
                        <div className="flex flex-wrap gap-2 m-2">
                            {details.steps.map((item) => (
                            <span key={item.number} className="p-1 text-xl flex gap-3">
                                <span className="flex-none w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black text-lg">
                                    {item.number}
                                </span>
                                <p className="text-gray-700 text-lg pt-1 leading-relaxed">
                                    {item.step}
                                </p>
                            </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div> 
);
}