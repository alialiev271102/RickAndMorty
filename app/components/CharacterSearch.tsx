"use client";
import axios from "axios";
import { useState } from "react"

interface Character {
    id: number,
    image: string,
    name: string,
    status: string,
    species: string,
    location: {name: string}
}

const CharacterSearch = () => {
    const [name, setName] = useState("");
    const [charactersList, setCharactrersList] = useState<Character[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchCharacter = async () => {
        if(!name.trim()) return;
        setLoading(true);
        setError("");
        setCharactrersList([]);

        try {
            const res = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            console.log(res.data.results)
            setCharactrersList(res.data.results)
        }catch (err) {
            setError("Персонаж не найден");
            console.log(err)
        } finally {
            setLoading(false);
        }
    }
    return(
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-24">
            <h1 className="text-4xl font-bold mb-6">Find Rick and Mortys Characters</h1>
            <div className="flex gap-2 mb-6 w-full max-w-md">
                <input 
                    type="text" 
                    placeholder="Rick Sanchez..." 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                onClick={searchCharacter}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold"
                >
                    Find
                </button>
            </div>
            {loading && <p className="text-yellow-400">Download </p>}
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
        </div>
    )
}

export default CharacterSearch;