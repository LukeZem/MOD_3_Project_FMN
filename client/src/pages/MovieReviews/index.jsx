import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Button, Container } from 'react-bootstrap';
import { movieContext } from '../../context/MovieContext';
import './index.css';
import axios from 'axios'

const MovieReviews = () => {
    const { reviews, setReviews, searchTerm } = useContext(movieContext);
    const [filteredReview, setFilteredReview] = useState([]);

    useEffect(() => {
        if (searchTerm && reviews.length > 0) {
            const searchResults = reviews.filter((review) =>
                review.title?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredReview(searchResults);
        } else {
            setFilteredReview(reviews);
        }
    }, [searchTerm, reviews]);

    const handleDelete = async (id) => {
        console.log(id);
        try {
            let response = await axios ({
                method: "DELETE",
                url:`/server/remove/${id}`
            });
            let newReviews = reviews.filter((review) =>{
                return review._id !== id
            });
            setReviews(newReviews);
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <Container className='review-card-container'>
                {filteredReview && filteredReview.length > 0 ? (
                    <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                        {filteredReview.map((review) => (
                            <Col key={review._id}>
                                <Card className="shadow border rounded h-100">
                                    <Card.Img variant="top" src={review.image} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{review.movieTitle}</Card.Title>
                                        <Card.Text>{review.releaseDate}</Card.Text>
                                        <Card.Text>{review.reviewText}</Card.Text>
                                        <Button variant="primary">Edit</Button>
                                        <Button
                                            variant="danger"
                                            className="mt-2"
                                            onClick={() => handleDelete(review._id)}>
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : searchTerm ? (
                    <p>No reviews found for "{searchTerm}".</p>
                ) : (
                    <p>Please enter a search term to find reviews.</p>
                )}
            </Container>
        </>
    );
};

export default MovieReviews;
