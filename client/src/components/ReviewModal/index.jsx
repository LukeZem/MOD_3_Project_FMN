import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { movieContext } from '../../context/MovieContext';
import axios from 'axios';

const ReviewModal = ({ show, handleClose, movie }) => {
    const [reviewText, setReviewText] = useState('');
    const { setReviews } = useContext(movieContext);

    const submitReview = async () => {
        // Create review object
        const review = {
            title: movie.Title,
            releaseDate: movie.Year,
            image: movie.Poster,
            reviewText: reviewText,
        };

        // Updating reviews in the context
        
        // make an axios call to send the review to the backend
        try {
            let response = await axios({
                method: "POST",
                url: 'server/addReview',
                data: review
            })
            console.log("trying to create review", response.data);
            // Close the modal
            console.log(show);
            setReviews((prevReviews) => [...prevReviews, response.data]);
            handleClose();

        } catch (err) {
            console.log("error POSTING review", err);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Write a Review for {movie.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="reviewText">
                        <Form.Label>Review</Form.Label>
                        <Form.Control as="textarea" rows={3} value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitReview}>
                    Submit Review
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReviewModal;
