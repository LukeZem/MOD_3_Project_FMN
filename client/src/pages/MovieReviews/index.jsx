import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { movieContext } from '../../context/MovieContext';

const MovieReviews = () => {

    const { reviews } = useContext(movieContext);
    console.log("checking reviews:", reviews);

    const handleDelete = async () => {

    }

    const handleEdit = async () => {

    }


    return (
        <>
            <div className='review-card-container'>
                <Row xs={1} md={2} lg={3} className="g-3">
                    {reviews.map((review) => (
                        <Col key={review._id}>
                            <Card className="h-100">
                                <Card.Img variant="top" src={review.image} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{review.movieTitle}</Card.Title>
                                    <Card.Text>{review.releaseDate}</Card.Text>
                                    <Card.Text>{review.reviewText}</Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
}

export default MovieReviews;