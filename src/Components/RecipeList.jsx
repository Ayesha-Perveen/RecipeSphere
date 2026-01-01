import RecipeCard from "./RecipeCard";

export default function RecipeList({ data }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {data && data.length > 0 ? (
                data.map((item) => (
                    <RecipeCard 
                        key={item.id} 
                        itemId={item.id} 
                        itemTitle={item.title} 
                        itemImage={item.image}
                    />
                ))
            ) : (
                <p className="text-gray-500 text-center col-span-full">
                    No recipes found. Try searching for something else!
                </p>
            )}
        </div>
    );
}