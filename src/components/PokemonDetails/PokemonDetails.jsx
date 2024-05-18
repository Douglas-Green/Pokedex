/** @format */

import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Loader from "../Loader";
import Navbar from "../Navbar/NavBar";
import "./PokemonDetails.css";

const PokemonDetails = () => {
  const {num} = useParams(); // Getting the Pokémon number from the URL parameters
  const [pokemon, setPokemon] = useState(null); // State to store Pokémon details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [hideLoading, setHideLoading] = useState(false); // State to handle hiding the loader

  useEffect(() => {
    // Fetching Pokémon data when the component mounts or the 'num' parameter changes
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
      .then(response => response.json())
      .then(data => {
        setPokemon(data); // Setting the fetched Pokémon data to state
        setLoading(false); // Updating loading state to false
      });
  }, [num]); // Dependency array ensures effect runs on 'num' change

  // Displaying loader if data is still being fetched
  if (loading && !hideLoading) {
    return (
      <div className="loader-container">
        <Loader />
        <button
          className="hide-loading-button"
          onClick={() => setHideLoading(true)}
        >
          Hide Loading
        </button>
      </div>
    );
  }

  // Handling case where no Pokémon data is found
  if (!pokemon) return <div className="error-message">Pokemon not found</div>;

  return (
    <div className="pokemon-details-container">
      <Navbar /> {/* Including the Navbar component for navigation */}
      <div className="pokemon-card">
        <img
          className="pokemon-image"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <h1 className="pokemon-name">{pokemon.name}</h1>
        <p className="pokemon-num">Num: {pokemon.id}</p>
        <p className="pokemon-type">
          Type: {pokemon.types.map(t => t.type.name).join(", ")}
        </p>
        <Link
          className="back-link"
          to="/pokemon-list"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetails;
