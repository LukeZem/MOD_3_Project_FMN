import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import MovieDisplay from '../../components/MovieDisplay';
import { movieContext } from '../../context/MovieContext';
import { Button, Card, Col, Row } from 'react-bootstrap';
import ReviewModal from '../../components/ReviewModal';
import './index.css'

const FindMovies = () => {

    // State to hold movie data
    // const [movie, setMovie] = useState(null);
    const { searchTerm, movies, setMovies } = useContext(movieContext);
    const [reviewText, setReviewText] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);

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


    const handleReviewClick = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMovie(null);
    };

    return (
        <div className='movie-card-container justify-content-center align-items-center'>
            <Row xs={1} md={2} lg={3} className="g-3">
                {movies.map((movie) => (
                    <Col key={movie.imdbID}>
                        <Card className="h-85 w-75">
                            <Card.Img variant="top" src={movie.Poster} alt='Movie Poster' />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Year}</Card.Text>
                                <Button variant="primary" className="mt-auto" onClick={() => handleReviewClick(movie)}>Review</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {selectedMovie && (
                <ReviewModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    movie={selectedMovie}
                />
            )}
        </div>
    );
};

export default FindMovies;
