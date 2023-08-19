import { Routes ,Route } from 'react-router-dom';
import './App.css'
import Home from './Containers/Home/Home';
import { Navigate } from 'react-router-dom';
import Auth from './Containers/Auth/Auth';
import Eror from './Containers/Eror/Eror';
import Profil from './Containers/Profil/Profil';
import Navbar from './Components/Navbar/Navbar';
function App() {

    const isLoggedIn = localStorage.getItem('authToken');

    return (

        <div className="App">
            { isLoggedIn ?  <Navbar />: <></> }
            <Routes>
                <Route path="/" element={ isLoggedIn ? <Navigate to="/Home" />: <Auth /> } />
                <Route path="/Home" element={ isLoggedIn ? <Home /> : <Navigate to="/" /> }/>
                <Route path="/Profil" element={ isLoggedIn ? <Profil /> : <Navigate to="/" /> }/>
                <Route path="*" element={<Eror/>} />
            </Routes>
        </div>
    )
}

export default App
