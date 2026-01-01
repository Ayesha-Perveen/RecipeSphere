import { GiCampCookingPot } from "react-icons/gi";
import { GoHeartFill } from "react-icons/go";

export default function Header() {
    return (
        <div className="flex justify-between items-center w-full p-6 bg-gray-200 text-white text-4xl cursor-pointer">
            <span className="flex items-center gap-2 text-orange-500">
                <GiCampCookingPot className="" />
                <span className="font-semibold">RecipeSphere</span>
            </span>
            <span>
                <GoHeartFill className="text-red-500 text-3xl hover:scale-110 transition-transform cursor-pointer" />
            </span>
        </div>
    );
}
