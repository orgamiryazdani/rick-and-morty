import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("FAVORITES")) || [])

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal

    async function fetchData() {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character?name=${query}`, { signal })
        setCharacters(data.results.slice(0, 4))
      } catch (err) {
        if (!axios.isCancel(err)) {
          setCharacters([])
          toast.error(err?.response?.data?.error)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [query])

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favorites))
  }, [favorites])

  const handleSelectCharacter = (id) => {
    setSelectedId(prevId => prevId === id ? null : id)
  }

  const handleAddFavorite = (char) => {
    setFavorites((prevFav) => [...prevFav, char])
  }

  const handleDeleteFavorite = (id) => {
    setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== id))
  }

  const isAddedToFavorite = favorites.map((fav) => fav.id).includes(selectedId)

  return <div className="app">
    <Toaster />
    <Navbar>
      <Search query={query} setQuery={setQuery} />
      <SearchResult numOfResult={characters.length} />
      <Favorites favorites={favorites} onDeleteFavorite={handleDeleteFavorite} />
    </Navbar>
    <div className="main">
      <CharacterList
        selectedId={selectedId}
        characters={characters}
        isLoading={isLoading}
        onSelectCharacter={handleSelectCharacter}
      />
      <CharacterDetail
        selectedId={selectedId}
        onAddFavorite={handleAddFavorite}
        isAddedToFavorite={isAddedToFavorite}
      />
    </div>
  </div>
}

export default App