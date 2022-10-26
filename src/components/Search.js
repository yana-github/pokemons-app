const Search = (props) => {
const {onChange} = props;
return(
    <>
    <input
    type="text"
    placeholder="Поиск покемона"
    name="search"
    onChange={onChange}
     />
    </>

)
}

export default Search;