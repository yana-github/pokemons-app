const PokemonDetails = (props) => {
  const { pokemonDetail } = props;
  const { name } = pokemonDetail;
  const pic1 = pokemonDetail.sprites.back_default;
  const pic2 = pokemonDetail.sprites.front_default;

  return (
    <div>
      <h1>Покемон:</h1>
      <h2>{name}</h2>
      <img src={`${pic1}`} alt="pic" />
      <img src={`${pic2}`} alt="pic" />
    </div>
  );
};

export default PokemonDetails;
