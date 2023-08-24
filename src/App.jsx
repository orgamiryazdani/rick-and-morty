import { useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("")
  const { isLoading, characters } = useCharacter("https://rickandmortyapi.com/api/character?name", query)
  const [selectedId, setSelectedId] = useState(null)

  const [favorites, setFavorites] = useLocalStorage("FAVORITES", [])

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