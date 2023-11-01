import { useContext, useState } from 'react';
import { movieContext } from '../../context/MovieContext';

const SearchBar = () => {
    const { searchType, setSearchType } = useContext(movieContext);
    const [searchValue, setSearchValue] = useState('');


    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(`Searching for ${searchType} "${searchValue}"`);
        // You can replace this console.log with your search logic here
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <select value={searchType} onChange={handleSearchTypeChange}>
                <option value="movie">Movie</option>
                <option value="genre">Genre</option>
            </select>
            <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search..."
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;