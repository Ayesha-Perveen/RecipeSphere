import { IoCloseOutline } from "react-icons/io5";
import RecipeCard from "./RecipeCard";

export default function WishList({ fav, setShowWishList, setFav, showRecipe, setShowRecipe }) {
    return (
        <div className="fixed inset-0 z-50 bg-white w-full h-screen overflow-y-auto block shadow-xl text-gray-900">
            
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-10">
                <h2 className="text-4xl font-bold">My Favorites ({fav.length})</h2>
                <button 
                    type="button" 
                    onClick={() => setShowWishList(false)}
                    className="text-3xl cursor-pointer shadow inline-flex items-center justify-center w-12 h-12 
                    bg-gray-100 hover:bg-gray-200 rounded-full transition-transform hover:scale-110 text-gray-800"
                >
                    <IoCloseOutline/>
                </button>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-20">
                {fav.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-xl font-medium">Your wishlist is empty.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 text-xl">
                        {fav.map((recipe) => (
                            <div key={recipe.itemId} className="flex justify-center w-full">
                                <RecipeCard 
                                    itemId={recipe.itemId} 
                                    itemTitle={recipe.itemTitle} 
                                    itemImage={recipe.itemImage}
                                    fav={fav}
                                    setFav={setFav}
                                    showRecipe={showRecipe}
                                    setShowRecipe={setShowRecipe}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}