import { useEffect, useState } from "react";
import axios from "axios";
import ICharacter from "../models/ICharacter";
import { log } from "console";

const HACHE_KEY = "characterSearchHache";

const useCharacterSearch = () => {
    const [name, setName] = useState("");
    const [charactersList, setCharactersList] = useState<ICharacter[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const hasheData = localStorage.getItem(HACHE_KEY);
        if(hasheData) {
            const parsedHache = JSON.parse(hasheData);
            setCharactersList(parsedHache.charactersList || []);
            setTotalPages(parsedHache.totalPages || 1);
        }

    },[])

    useEffect(() => {
        if(name.trim()) {
            searchCharacter();
        }
    }, [page]);

    const searchCharacter = async () => {
        if (!name.trim()) return;

        const hasheData = localStorage.getItem(HACHE_KEY);
        if(hasheData) {
            const parsedHache = JSON.parse(hasheData);
            if (parsedHache[name] && parsedHache[name][page]) {
                setCharactersList(parsedHache[name][page].charactersList)
                setTotalPages(parsedHache[name][page].totalPages)
                return;
            }
        }

        setLoading(true);
        setError("");
        setCharactersList([]);

        try {
            const res = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`);
            setCharactersList(res.data.results);
            setTotalPages(res.data.info.pages);

            const newHache = hasheData ? JSON.parse(hasheData) : {};
            if(!newHache[name]) {
                newHache[name] = {};
            }
            newHache[name][page] = {
                charactersList: res.data.results,
                totalPages: res.data.info.pages,
            };
            localStorage.setItem(HACHE_KEY, JSON.stringify(newHache));

        } catch (err: any) {
            if (err.status === 404) {
                setError("Character not found");
            } else {
                setError("Apparently there is some kind of problem, Can't get an answer")
            }
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    return { name, setName, charactersList, loading, error, searchCharacter, page, setPage, totalPages };
};

export default useCharacterSearch;
