import React from "react";
import axios from "axios";
import styles from "./pokemonApp.module.css";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";

const url = "https://pokeapi.co/api";

class PokemonApp extends React.Component {
  state = {
    pokemons: null,
    selectedPokemon: null,
    pokemonDetail: null,
  };

  componentDidMount() {
    axios.get(`${url}/v2/pokemon/?offset=0&limit=20.json`).then((response) => {
      const pokemons = response.data.results;
      this.setState({ pokemons });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedPokemon !== prevState.selectedPokemon) {
      this.fetchData(this.state.selectedPokemon);
    }
  }

  fetchData = (path) => {
    console.log("fetch");

    axios.get(`${path}`).then((response) => {
      const pokemonDetail = response.data;
      this.setState({ pokemonDetail });
    });
  };

  toGetInfo = (name) => {
    const selectedPokemon = this.state.pokemons.filter((pokemon) => {
      if (pokemon.name === name) {
        return pokemon;
      }
      return null;
    });

    this.setState({ selectedPokemon: selectedPokemon[0].url });
  };

  render() {
    const { pokemons, pokemonDetail } = this.state;
    console.log(pokemonDetail);

    if (!pokemons) {
      return <h1>ЗАГРУЗКА</h1>;
    }
    return (
      <div className={styles.app}>
        <div className={styles.mainWrap}>
          <div className={styles.mainBlock}>
            <PokemonList pokemons={pokemons} toGetInfo={this.toGetInfo} />
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
  }
}

export default PokemonApp;
