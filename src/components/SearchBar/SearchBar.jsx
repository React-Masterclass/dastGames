import style from "../SearchBar/SearchBar.module.css"
// eslint-disable-next-line react/prop-types
export default function SearchBar({search, setSearch}) {
    const handleSearchChange = (event) => {
        const newSearch = event.target.value;
        setSearch(newSearch);
      };

  return (
    <input
      type="text"
      className={`${style.search} w-75 align-self-center mb-3`}
      value={search}
      onChange={handleSearchChange}
      placeholder="Cerca tra 860,036 giochi"
    />
  );
}
