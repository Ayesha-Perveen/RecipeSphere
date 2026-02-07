import { IoIosSearch } from "react-icons/io";
import searchbar_bg from "../Assets/searchbar_bg.jpg";
import { useEffect,useState } from "react";
//"a4ed99e7776b4a4fb4baade201ef6f17"
//"5dfde382d5c14fbf9314b9e895832c71"
const url="https://api.spoonacular.com/recipes/complexSearch";
const api_key="5dfde382d5c14fbf9314b9e895832c71";

export default function SearchBox({ searchEle, setSearchEle,setData }) 
{

    const [query, setQuery] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (searchEle.trim()) {
            setQuery(searchEle);
            setSearchEle("");
        }
    }

    useEffect(()=>{
        async function handleData()
        {
            if (!query) return;

            try {
                const response = await fetch(`${url}?query=${query}&apiKey=${api_key}`);
                
                if (response.status === 402) {
                    alert("Daily API limit reached!");
                    return;
                }

                const jsdata = await response.json();
                setData(jsdata.results);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        }
        handleData();
    },[query])

    return (
        <div className="flex w-full h-64 p-6 justify-center bg-cover bg-center" style={{ backgroundImage: `url(${searchbar_bg})` }}>
            <form onSubmit={handleSubmit} className="flex items-stretch">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchEle}
                    onChange={(e) => setSearchEle(e.target.value)}
                    className="border border-gray-400 border-r-0 rounded-l-2xl bg-gray-200 px-4 py-2 w-64 text-xl outline-none focus:bg-white transition-all h-14"
                />
                <button 
                    type="submit" 
                    className="flex items-center justify-center border border-gray-400 rounded-r-2xl bg-orange-500 px-4 cursor-pointer hover:bg-orange-700 transition-colors h-14"
                >
                    <IoIosSearch className="text-white [stroke-width:25px] stroke-white text-2xl" />
                </button>
            </form>
        </div>
    );
}