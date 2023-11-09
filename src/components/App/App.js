import '../../vendor/fonts/fonts.css';
import React, { useState} from "react";
import { Route, Routes } from 'react-router-dom';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies.jsx';
import { Register } from '../Register/Register.jsx';
import { Login } from '../Login/Login.jsx';
import { Profile } from '../Profile/Profile.jsx';
import { PageNotFound } from '../PageNotFound/PageNotFound.jsx';

function App() {
  // const [currentUser, setСurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main />} loggedIn={loggedIn} />
        <Route path="/movies" element={<Movies />} loggedIn={loggedIn} />
        <Route path="/saved-movies" element={<SavedMovies />} loggedIn={loggedIn}/>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} loggedIn={loggedIn}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
