import { useState, useEffect, useReducer } from "react";
import { createContext } from "react";


export const initialState = { 
  theme: localStorage.getItem('tema'), 
  favsOdonts: [] 
}

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {

  const getFavsFromStorage = () => {
    const localData = localStorage.getItem("favs");
    return localData ? JSON.parse(localData) : [];
  };

  const saveFavsFromStorage = (fav) => {
    localStorage.setItem("favs", JSON.stringify(fav));
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ODONTO_FAV': {
        const existsOdonto = state.favsOdonts.find((odonto) => odonto.id === action.odonto.id);
        if (existsOdonto) {
          return state;
        }
        const newFavsOdonts = [...state.favsOdonts, action.dentist];
        saveFavsFromStorage(newFavsOdonts)
        return { ...state, favsOdonts: newFavsOdonts };
      }
      case 'LOAD_ODONTS_FAVS': {
        return { ...state, favsOdonts: getFavsFromStorage() };
      }
      case 'REMOVE_ODONTO': {
        const newFavsOdonts = state.favsOdonts.filter((odonto) => odonto.id !== action.odonto.id);
        saveFavsFromStorage(newFavsOdonts);
        return { ...state, favsOdonts: newFavsOdonts };
      }
      case 'REMOVE_ALL_ODONTO': {
        localStorage.removeItem("favs");
        return { ...state, favsOdonts: [] };
      }
      case 'COLOR_FONDO': {
        localStorage.setItem('fondo', action.theme);
        return { ...state, theme: action.theme };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [Odonts, setOdonts] = useState([]);
  const getOdonts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setOdonts(data)
  };

  useEffect(() => {
    getOdonts();
    dispatch({ type: "LOAD_ODONTS_FAVS" });
  }, [])


  return (
    <ContextGlobal.Provider value={{ Odonts, state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};
