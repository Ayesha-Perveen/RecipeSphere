import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

export default function RecipeCard({itemId,itemTitle,itemImage,fav,setFav})
{
    const isFavorite = fav.some((f) => f.itemId === itemId);
    const handleToggle = () => 
        {
        const recipeToToggle = { itemId, itemTitle, itemImage };
        setFav((prevFav) => {
            const alreadyExists = prevFav.some((fv) => fv.itemId === itemId);
            if (alreadyExists) {
                return prevFav.filter((f) => f.itemId !== itemId);
            } else {
                return [...prevFav, recipeToToggle];
            }
        });
    };

    return (<>
     <div className="">
        <a href="#" className="flex w-64px flex-col items-center p-4 border border-default rounded-xl shadow-2xl md:flex-row md:max-w-xl  ">
            <img className="object-cover w-full rounded-4xl h-48 md:h-auto md:w-48 mb-4 md:mb-0" src={itemImage} alt="Image of the food." />
            <div className="flex flex-col justify-between md:p-4 leading-normal">
                <h5 className="mb-2 text-xl font-bold">{itemTitle}</h5>
                <div className="p-2 flex ">
                    <button type="button" className="inline-flex items-center w-auto border hover:bg-orange-400 focus:ring-2 shadow-l font-medium leading-5 rounded-xl text-m px-4 py-2.5 focus:outline-none mx-3 h-10 hover:scale-110 transition-transform cursor-pointer">
                         Recipe  <MdOutlineArrowForwardIos className="h-6 ml-2 text-2xl"/>
                    </button>
                    <button type="button" 
                    onClick={handleToggle}
                    className=" h-10 inline-flex items-center border hover:bg-red-500 focus:ring-2  rounded-xl text-sm px-4 py-2.5 hover:scale-110 transition-transform cursor-pointer">
                        {isFavorite ? <MdFavorite className="text-red-400 text-xl"/> : <MdFavoriteBorder className="text-2xl"/>}
                         
                    </button>
                </div>
            </div>
        </a>
     </div>
    </>)
}