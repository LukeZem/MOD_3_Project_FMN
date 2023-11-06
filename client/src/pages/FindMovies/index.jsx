import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import MovieDisplay from '../../components/MovieDisplay';
import { movieContext } from '../../context/MovieContext';
import { Button, Card, Col, Row } from 'react-bootstrap';
import './index.css'

const FindMovies = () => {

    // State to hold movie data
    // const [movie, setMovie] = useState(null);
    const { searchTerm, movies, setMovies } = useContext(movieContext);

    // Function to getMovies
    const getMovie = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `/server/movies:${searchTerm}`
            })
            console.log("checking response from /server/movies:", response);
            setMovies(response.data.Search);
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


    const createReview = async (movie) => {
        // grab movie data and POST to server
    }


    let middleIndex = Math.ceil(movies.length / 2)
    let moviesOne = movies.slice(0, middleIndex);
    let moviesTwo = movies.slice(middleIndex, movies.length);

    return (
        <div className='movie-card-container'>
            <Row xs={1} md={2} lg={3} className="g-3">
                {movies.map((movie) => (
                    <Col key={movie.imdbID}>
                        <Card className="h-100">
                            <Card.Img variant="top" src={movie.Poster} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Year}</Card.Text>
                                <Button variant="primary" className="mt-auto" onClick={(movie) => { createReview(movie) }}>Review</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default FindMovies;
