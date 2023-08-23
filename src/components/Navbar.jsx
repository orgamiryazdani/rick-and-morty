import { HeartIcon } from "@heroicons/react/24/outline"

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
    return <input type="text" placeholder="search..." value={query} onChange={(e) => setQuery(e.target.value)} className="text-field" />
}

export function SearchResult({ numOfResult }) {
    return <div className="navbar__result">Found {numOfResult} characters</div>
}

export function Favorites({ numOfFavorites }) {
    return <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">{numOfFavorites}</span>
    </button>
}