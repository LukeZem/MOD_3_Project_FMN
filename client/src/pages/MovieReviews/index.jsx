import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { movieContext } from '../../context/MovieContext';

const MovieReviews = () => {

    const { reviews } = useContext(movieContext);
    console.log("checking reviews:", reviews);

    return (
        <>
            {reviews.map((review) => (
                <Card
                    key={review._id}
                    variant="Primary"
                    text='light'
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header>Creator: {review.userName}</Card.Header>
                    <Card.Img variant='top' src='review' />
                    <Card.Body>
                        <Card.Title>{review.movieTitle}</Card.Title>
                        <Card.Text>
                            {review.reviewText}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}

export default MovieReviews