import { HeartIcon } from "@heroicons/react/24/outline"

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__logo">LOGO 😍</div>
            <input type="text" placeholder="search..." className="text-field" />
            <div className="navbar__result">Found X characters</div>
            <button className="heart">
                <HeartIcon className="icon" />
                <span className="badge">4</span>
            </button>
        </nav>
    )
}

export default Navbar