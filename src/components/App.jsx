/** @format */

import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import PropTypes from " prop-types";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={PokemonList}
        />
        <Route
          path="/pokemon/:num"
          component={PokemonDetails}
        />
      </Switch>
    </Router>
  );
};

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [weaknessFilter, setWeaknessFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then(response => response.json())
      .then(data => {
        setPokemon(data.pokemon);
        setLoading(false);
      });
  }, []);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const handleTypeFilter = e => {
    setTypeFilter(e.target.value);
  };

  const handleWeaknessFilter = e => {
    setWeaknessFilter(e.target.value);
  };

  const filteredPokemon = pokemon.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter ? p.type.includes(typeFilter) : true) &&
      (weaknessFilter ? p.weaknesses.includes(weaknessFilter) : true)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={handleSearch}
      />
      <select onChange={handleTypeFilter}>
        <option value="">Filter by type</option>
        {Array.from(new Set(pokemon.flatMap(p => p.type))).map(type => (
          <option
            key={type}
            value={type}
          >
            {type}
          </option>
        ))}
      </select>
      <select onChange={handleWeaknessFilter}>
        <option value="">Filter by weakness</option>
        {Array.from(new Set(pokemon.flatMap(p => p.weaknesses))).map(
          weakness => (
            <option
              key={weakness}
              value={weakness}
            >
              {weakness}
            </option>
          )
        )}
      </select>
      <ul>
        {filteredPokemon.map(p => (
          <li key={p.num}>
            <Link to={`/pokemon/${p.num}`}>
              <h2>{p.name}</h2>
              <p>Num: {p.num}</p>
              <p>Type: {p.type.join(", ")}</p>
              <p>Weaknesses: {p.weaknesses.join(", ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PokemonDetails = ({match}) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then(response => response.json())
      .then(data => {
        const selectedPokemon = data.pokemon.find(
          p => p.num === match.params.num
        );
        setPokemon(selectedPokemon);
        setLoading(false);
      });
  }, [match.params.num]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pokemon) return <div>Pokemon not found</div>;

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <p>Num: {pokemon.num}</p>
      <p>Type: {pokemon.type.join(", ")}</p>
      <p>Weaknesses: {pokemon.weaknesses.join(", ")}</p>
      <Link to="/">Back</Link>
      {pokemon.next_evolution && (
        <div>
          <h2>Next Evolutions</h2>
          <ul>
            {pokemon.next_evolution.map(evo => (
              <li key={evo.num}>
                <Link to={`/pokemon/${evo.num}`}>{evo.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
// PropTypes for PokemonDetails component
PokemonDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      num: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default App;
