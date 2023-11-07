import { useContext, useState } from 'react';
import { movieContext } from '../../context/MovieContext';

const SearchBar = () => {
    const { searchTerm, setSearchTerm } = useContext(movieContext);
    const [searchValue, setSearchValue] = useState('');


    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    // const handleSearchTermChange = (e) => {
    //     setSearchTerm(e.target.value);
    // };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(`Searching for ${searchTerm} "${searchValue}"`);
        // replace this console.log with search logic here
        setSearchTerm(searchValue);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            {/* <select value={searchTerm} onChange={handleSearchTermChange}>
                <option value="movie">Movie</option>
                <option value="genre">Genre</option>
            </select> */}
            <input
                type="text"
                name='value'
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search..."
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;