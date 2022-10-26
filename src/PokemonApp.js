import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./pokemonApp.module.css";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import Search from "./components/Search";

const url = "https://pokeapi.co/api";

const PokemonApp = () => {

const [pokemons, setPokemons] = useState(null);
const [selectedPokemon, setSelectedPokemon] = useState(null);
const [pokemonDetail, setPokemonDetail] = useState(null);

const[inputValue, setInputValue] = useState("");


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


  const filterPokemons = () => {
    if(pokemons) {
      let copyPokemons = [...pokemons];
      if(inputValue) {
        let filterPokemons = copyPokemons.filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(inputValue.toLowerCase().split(' ').join(''));
        })
        return filterPokemons;
      }
    }
  }

  const filteredPokemons = filterPokemons();

    if (!pokemons) {
      return <h1>ЗАГРУЗКА</h1>;
    }
    return (
      <div className={styles.app}>
  
        <div className={styles.mainWrap}>

   
          <div className={styles.mainBlock}>
          <Search onChange={(e) => setInputValue(e.target.value)} />
          <br/>
            <PokemonList pokemons={filteredPokemons ? filteredPokemons : pokemons } toGetInfo={toGetInfo} />
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