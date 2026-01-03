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
    const api_key="a4ed99e7776b4a4fb4baade201ef6f17";
    const url1=`https://api.spoonacular.com/recipes/${showRecipe.id}/summary?apiKey=${api_key}`;
    const url2=`https://api.spoonacular.com/recipes/${showRecipe.id}/analyzedInstructions?apiKey=${api_key}`;
    
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
            
            const steps = data2[0]?.steps || [];

            setDetails({
            summary: data1.summary,
            steps: steps,
            ingredients: [...new Set(steps.flatMap(s => s.ingredients.map(i => i.name)))],
            equipment: [...new Set(steps.flatMap(s => s.equipment.map(e => e.name)))]
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
                <h3 className="p-2 font-semibold text-2xl">{showRecipe.title}</h3>
                <img src={showRecipe.image} alt="food image" className="p-2 mx-2 rounded-3xl" />
            </div>
            <h4 className="text-2xl font-semibold italic m-2">Summary :</h4>
            {details.summary && (
                <div 
                    className="text-gray-800 p-2 mb-2 text-lg"
                    dangerouslySetInnerHTML={{ __html: details.summary }} 
                />
            )}
            <div className="m-2 my-4">
                <h2 className="text-2xl m-2 font-semibold italic">Equipments needed : </h2>
                {details.equipment && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {details.equipment.map((item) => (
                    <span key={item.id} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {item}
                    </span>
                    ))}
                </div>
                )}
            </div>
            <div className="m-2 my-4">
                <h2 className="text-2xl m-2 font-semibold italic">Ingredients needed : </h2>
                {details.ingredients && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {details.ingredients.map((item) => (
                    <span key={item.id} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {item}
                    </span>
                    ))}
                </div>
                )}
            </div>
            <div className="m-2 my-4">
                <h2 className="text-2xl m-2 font-semibold italic">Steps : </h2>
                {details.steps && (
                <div className="flex flex-wrap gap-2 m-2">
                    {details.steps.map((item) => (
                    <span key={item} className="p-1 text-xl">
                    {item.number} {item.step}
                    </span>
                    ))}
                </div>
                )}
            </div>


        </div>
    </div>
);
}