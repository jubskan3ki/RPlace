import { Link } from 'react-router-dom'; // <- Voici la correction
import './Navbar.css'

export default function Navbar() {
    return (
        <div className='Navbar'>
            <Link to="/home">Home</Link>
            <Link to="/profil">Profil</Link>
        </div>
    )
}
