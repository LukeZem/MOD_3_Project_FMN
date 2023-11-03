import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import MovieDisplay from '../../components/MovieDisplay';
import { movieContext } from '../../context/MovieContext';

const FindMovies = () => {

    // State to hold movie data
    const [movie, setMovie] = useState(null);
    const { searchTerm } = useContext(movieContext);

    // Function to getMovies
    const getMovie = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `/server/movies:${searchTerm}`
            })
            console.log("checking response from /server/movies:", response);
            setMovie(response.data);
        } catch (err) {
            console.log('Error getting movies', err);
        }
    };

    // useEffect will run when searchTerm changes
    useEffect(() => {
        if (searchTerm) {
            getMovie();
        }
    }, [searchTerm]);

    return (
        <div>
            <MovieDisplay movie={movie} />
        </div>
    );
};

export default FindMovies;
