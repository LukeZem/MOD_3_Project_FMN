import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const movieContext = createContext();

export const MovieProvider = ({ children }) => {
    // movies
    // reviews
    // rating... average rating?
    // search bar for movie name or genre (searchValue, setSearchValue,...?)
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    // const [review, setReview] = useState({
    //     movieTitle: '',
    //     releaseDate: '',
    //     img: '',
    //     reviewText: ''
    // });
    const [reviews, setReviews] = useState([]);
    const [movieChoice, setMovieChoice] = useState(null);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('/server/reviews');
            setReviews(response.data);
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    // Use useEffect to fetch reviews on first render
    useEffect(() => {
        fetchReviews();
    }, []);


    return (
        <movieContext.Provider
            value={
                {
                    searchTerm, setSearchTerm,
                    movies, setMovies,
                    reviews, setReviews,
                    movieChoice, setMovieChoice
                }
            } >
            {children}
        </movieContext.Provider>
    )
}


export default MovieProvider;