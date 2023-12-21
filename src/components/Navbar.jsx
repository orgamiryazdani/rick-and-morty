import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import Modal from "./Modal"
import { Character } from "./CharacterList"

function Navbar({ children }) {
    return (
        <nav className="navbar">
            <Logo />
            {children}
        </nav>
    )
}

export default Navbar

function Logo() {
    return <div className="navbar__logo">LOGO 😍</div>
}
export function Search({ query, setQuery }) {
    return <input type="text" placeholder="search..." value={query} onChange={(e) => setQuery(e.target.value)} className="text-field search__input" />
}

export function SearchResult({ numOfResult }) {
    return <div className="navbar__result">Found {numOfResult} characters</div>
}

export function Favorites({ favorites, onDeleteFavorite }) {
    const [isOpen, setIsOpen] = useState(false);

    return <>
        <Modal onOpen={setIsOpen} open={isOpen} title="List of Favorites">
            {
                favorites.map((item) => <Character
                    key={item.id}
                    item={item}
                >
                    <button className="icon red" onClick={() => onDeleteFavorite(item.id)}>
                        <TrashIcon />
                    </button>
                </Character>
                )
            }
        </Modal>
        <button className="heart" onClick={() => setIsOpen((is) => !is)}>
            <HeartIcon className="icon" />
            <span className="badge">{favorites.length}</span>
        </button>
    </>
}
