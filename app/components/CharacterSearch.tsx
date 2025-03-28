"use client";
import axios from "axios";
import { useState } from "react"

interface Character {
    id: number,
    avatar: string,
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
        <div>
            <h1>Поиск персонажей</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Введите имя для поиска" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={searchCharacter}>Найти</button>
            </div>
            {loading && <p>Загрузка </p>}
            {error && <p>{error}</p>}
            <div>
            </div>
        </div>
    )
}

export default CharacterSearch;