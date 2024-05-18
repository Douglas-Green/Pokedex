/** @format */

import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {getAllPokemon} from "../../PokeApiService";

const PokemonCard = ({pokemon}) => (
  <li className="pokemon-card">
    <Link to={`/pokemon/${pokemon.name}`}>
      <img
        src={pokemon.image}
        alt={pokemon.name}
      />
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
    </Link>
  </li>
);

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const pokemonGroups = [];
  for (let i = 0; i < pokemon.length; i += 3) {
    pokemonGroups.push(pokemon.slice(i, i + 3));
  }

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getAllPokemon();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pokemon-list">
      {pokemonGroups.map((group, index) => (
        <div
          key={index}
          className="pokemon-row"
        >
          {group.map(poke => (
            <PokemonCard
              key={poke.name}
              pokemon={poke}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default PokemonList;
