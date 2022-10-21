import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./pokemonApp.module.css";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";

const url = "https://pokeapi.co/api";

const PokemonApp = () => {

const [pokemons, setPokemons] = useState(null);
const [selectedPokemon, setSelectedPokemon] = useState(null);
const [pokemonDetail, setPokemonDetail] = useState(null);


useEffect(() => {
  axios.get(`${url}/v2/pokemon/?offset=0&limit=20.json`).then((response) => {
    const pokemons = response.data.results;
    setPokemons(pokemons);
  });
}, []);


  useEffect(() => {
    if (selectedPokemon !== null) {
      fetchData(selectedPokemon);
    }
  }, [selectedPokemon]);






 const fetchData = (path) => {

    axios.get(`${path}`).then((response) => {
      const pokemonDetail = response.data;
 setPokemonDetail(pokemonDetail);
    });
  };

 const toGetInfo = (name) => {
    const selectedPokemon = pokemons.filter((pokemon) => {
      if (pokemon.name === name) {
        return pokemon;
      }
      return null;
    });

    setSelectedPokemon(selectedPokemon[0].url);
  };


    if (!pokemons) {
      return <h1>ЗАГРУЗКА</h1>;
    }
    return (
      <div className={styles.app}>
        <div className={styles.mainWrap}>
          <div className={styles.mainBlock}>
            <PokemonList pokemons={pokemons} toGetInfo={toGetInfo} />
          </div>
          <div className={styles.aboutBlock}>
            {pokemonDetail && (
              <>
                <PokemonDetails pokemonDetail={pokemonDetail} url={url} />
              </>
            )}
          </div>
        </div>

        <div className={styles.btnWrap}>
          <button
          /*        onClick={() => toGetInfo(name)} */
          >
            Предыдущая страница
          </button>
          <button
          /*        onClick={() => toGetInfo(name)} */
          >
            Следующая страница
          </button>
        </div>
      </div>
    );
  };

export default PokemonApp;