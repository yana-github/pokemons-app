import styles from "./styles/pokemonList.module.css";
import PokemonItem from "./PokemonItem";

const PokemonList = (props) => {
  const { pokemons, toGetInfo } = props;

  const allPokemons = pokemons.map(
    (pokemon) =>
    <PokemonItem key={pokemon.name} {...pokemon} toGetInfo={toGetInfo} />
  );

  return (
    <div className={styles.listBlock}>
      <h1>Все наши покемоны</h1>
      <div className={styles.allPokemons}>{allPokemons}</div>
    </div>
  );
};

export default PokemonList;
