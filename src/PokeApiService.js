/** @format */

import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const getAllPokemon = async (limit = 50) => {
  const response = await axios.get(`${API_URL}?limit=${limit}`);
  const pokemonList = response.data.results;

  // fetch details for each Pokemon
  const detailedPokemonList = await Promise.all(
    pokemonList.map(async pokemon => {
      const details = await getPokemonById(pokemon.name);
      return details;
    })
  );

  return detailedPokemonList;
};

export const getPokemonById = async id => {
  const response = await axios.get(`${API_URL}/${id}`);
  const {name, sprites, stats} = response.data;

  // Check if sprites is defined and sprites.front_default is available, otherwise provide a default value
  const image =
    sprites && sprites.front_default
      ? sprites.front_default
      : "default_image_url";

  return {
    name,
    image,
    stats: stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  };
};
