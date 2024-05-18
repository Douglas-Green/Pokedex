/** @format */

import Navbar from "../Navbar/NavBar";
import LoadingToggle from "../LoadingToggle/LoadingToggle";
import AnimationToggle from "../AnimationToggle/AnimationToggle";
import {useEffect, useState} from "react";
import "./Homepage.css";

const Home = () => {
  const title = "POKEDEX";
  const titleAddOn = "Your 1 stop shop for all things Pokemon!";
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hideLoading, setHideLoading] = useState(false);
  const [isAnimationOn, setIsAnimationOn] = useState(true);

  useEffect(() => {
    fetch("https://api.pokemontcg.io/v2/cards")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setPokemons(data.data);
        setLoading(false);
      })
      .catch(error => console.error("Error:", error));
  }, []);

  if (loading && !hideLoading) {
    return (
      <LoadingToggle
        loading={loading}
        hideLoading={hideLoading}
        setHideLoading={setHideLoading}
      />
    );
  }

  return (
    <div>
      <Navbar />

      <AnimationToggle
        isAnimationOn={isAnimationOn}
        setIsAnimationOn={setIsAnimationOn}
      />
      <h1 className="title">{title}</h1>
      <h3 className="title-addon">{titleAddOn}</h3>
      <div className="home-image-container">
        {pokemons.map(pokemon => (
          <img
            className={`home-card-image ${isAnimationOn ? "" : "paused"}`}
            src={pokemon.images.small}
            alt={pokemon.name}
            key={pokemon.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
