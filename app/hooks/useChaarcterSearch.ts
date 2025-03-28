import { useState } from "react";
import axios from "axios";
import ICharacter from "../models/ICharacter";

const useCharacterSearch = () => {
    const [name, setName] = useState("");
    const [charactersList, setCharactersList] = useState<ICharacter[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchCharacter = async () => {
        if (!name.trim()) return;

        setLoading(true);
        setError("");
        setCharactersList([]);

        try {
            const res = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            setCharactersList(res.data.results);
        } catch (err) {
            setError("Character not found");
        } finally {
            setLoading(false);
        }
    };

    return { name, setName, charactersList, loading, error, searchCharacter };
};

export default useCharacterSearch;
