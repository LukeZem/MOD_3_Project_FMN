import { createContent, useContext, useState } from 'react'

export const movieContext = useContext();

export const MovieProvider = (props) => {
    // movies
    // reviews
    // rating... average rating?
    // search bar for movie name or genre (searchValue, setSearchValue,...?)
    const [searchType, setSearchType] = useState('');
}