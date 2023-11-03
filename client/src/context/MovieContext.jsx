import { createContext, useEffect, useState } from 'react'

export const movieContext = createContext();

export const MovieProvider = ({ children }) => {
    // movies
    // reviews
    // rating... average rating?
    // search bar for movie name or genre (searchValue, setSearchValue,...?)
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [review, setReview] = useState({
        userName: '',
        movieTitle: '',
        releaseDate: '',
        cast: [{
            name: "",
            character: ""
        }],
        reviewText: ''
    });
    const [reviews, setReviews] = useState([]);




    return (
        <movieContext.Provider
            value={
                {
                    searchTerm, setSearchTerm,
                    movies, setMovies,
                    review, setReview,
                    reviews, setReviews
                }
            } >
            {children}
        </movieContext.Provider>
    )
}


export default MovieProvider;