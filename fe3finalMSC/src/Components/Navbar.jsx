import React, { useContext } from 'react'
import { ContextGlobal } from "../Components/utils/global.context";
import { Link } from 'react-router-dom';

const Navbar = () => {

  const {state, dispatch} = useContext(ContextGlobal)

  const colorFondo = (theme) => {
    dispatch({ type: 'COLOR_FONDO', theme });
  };

  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/favs">Favorites</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
      </ul>
      <button onClick={() => colorFondo(!state.theme)}>{state.theme ? 'Modo Oscuro':'Modo Claro'}</button>
    </nav>
  )
}

export default Navbar