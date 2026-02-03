import { GiCampCookingPot } from "react-icons/gi";
import { GoHeartFill } from "react-icons/go";
import WishList from "./WishList";
export default function Header({fav,setShowWishList,showRecipe,setShowRecipe,showWishList,setFav}) {
    return (
        <div className="flex justify-between items-center w-full p-6 bg-gray-200 text-white text-4xl cursor-pointer">
            <span className="flex items-center gap-2 text-orange-500">
                <GiCampCookingPot className="" />
                <span className="font-semibold">RecipeSphere</span>
            </span>
            <button onClick={() => { setShowWishList(true) }}>
                <GoHeartFill className="text-red-500 text-3xl hover:scale-110 transition-transform cursor-pointer" />
            </button>
            {showWishList && (
                <WishList 
                    fav={fav} 
                    setFav={setFav}
                    showRecipe={showRecipe} 
                    setShowRecipe={setShowRecipe}
                    setShowWishList={setShowWishList}
                />
            )}
        </div>
    );
}
