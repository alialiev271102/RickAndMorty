"use client";
import useCharacterSearch from "../hooks/useCharacterSearch";

const CharacterSearch = () => {
   
    const { name, setName, charactersList, loading, error, searchCharacter, page, setPage, totalPages } = useCharacterSearch();
    
    return(
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-24">
            <h1 className="text-4xl font-bold mb-6">Find Rick and Mortys Characters</h1>
            <div className="flex gap-2 mb-6 w-full max-w-md">
                <input 
                    type="text" 
                    placeholder="Rick Sanchez..." 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
                />
                <button
                onClick={() => {
                    setPage(1);
                    searchCharacter();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold"
                disabled={loading}
                >
                    {loading ? 
                     <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div> :
                     "Find"}
                </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                {charactersList.map((character) => (
                    <div
                        key={character.id}
                        className="bg-gray-800 p-4 rounded-lg shadow-lg"
                    >
                        <img 
                            src={character.image} 
                            alt={character.name}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                        <h2 className="text-xl font-bold mt-2">{character.name}</h2>
                        <p className="text-gray-400">Status: {character.status}</p>
                        <p className="text-gray-400">Species: {character.species}</p>
                        <p className="text-gray-400">Location: {character.location.name}</p>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex gap-4 mt-6">
                    <button
                        className="px-4 py2 rounded-lg"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        {"<="}Previous 
                    </button>
                    <span className="text-xl font-bold"> {page} / {totalPages} </span>
                    <button
                        className="px-4 py-2 rounded-lg"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Next{"=>"}
                    </button>
                </div>
            )}
        </div>
    )
}

export default CharacterSearch;