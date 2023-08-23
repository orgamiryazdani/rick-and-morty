import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Search, SearchResult } from "./components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character?name=${query}`)
        setCharacters(data.results.slice(0, 4))
      } catch (err) {
        setCharacters([])
        toast.error(err?.response?.data?.error)
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setCharacters([])
      return;
    }

    fetchData()
  }, [query])

  const handleSelectCharacter = (id) => {
    setSelectedId(prevId => prevId === id ? null : id)
  }
  console.log(selectedId);

  return <div className="app">
    <Toaster />
    <Navbar>
      <Search query={query} setQuery={setQuery} />
      <SearchResult numOfResult={characters.length} />
    </Navbar>
    <div className="main">
      <CharacterList selectedId={selectedId} characters={characters} isLoading={isLoading} onSelectCharacter={handleSelectCharacter} />
      <CharacterDetail selectedId={selectedId} />
    </div>
  </div>
}

export default App