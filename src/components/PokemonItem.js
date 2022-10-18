import styles from "./styles/pokemonItem.module.css";

const PokemonItem = (props) => {
  const { name, url, toGetInfo } = props;
  return (
    <div className={styles.pokemon}>
          <h3>{name}</h3>
          <button
            className={styles.aboutPokemon}
            onClick={() => toGetInfo(name)}
          >
            Подробнее
          </button>
    </div>
  );
};

export default PokemonItem;