/** @format */

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Homepage/Homepage";
import PokemonList from "./PokemonList/PokemonList";
import PokemonDetails from "./PokemonDetails/PokemonDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/pokemon-list"
          element={<PokemonList />}
        />
        <Route
          path="/pokemon/:num"
          element={<PokemonDetails />}
        />
      </Routes>
    </Router>
  );
};

export default App;
