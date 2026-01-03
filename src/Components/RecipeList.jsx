import RecipeCard from "./RecipeCard";
import InstructionCard from "./InstructionCard";

export default function RecipeList({ data,fav,setFav,showRecipe,setShowRecipe}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
           {showRecipe==null ? (
                data && data.length > 0 ? (
                    data.map((item) => (
                        <RecipeCard 
                            key={item.id} 
                            itemId={item.id} 
                            itemTitle={item.title} 
                            itemImage={item.image}
                            fav={fav}
                            setFav={setFav}
                            showRecipe={showRecipe}
                            setShowRecipe={setShowRecipe}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full">
                        No recipes found. Try searching for something else!
                    </p>
                )
            ) : (
                <InstructionCard 
                    showRecipe={showRecipe} 
                    setShowRecipe={setShowRecipe}
                    onClose={() => setShowRecipe(null)}
                />
            )}
        </div>
    );
}