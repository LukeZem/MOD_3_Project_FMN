import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { movieContext } from '../../context/MovieContext';
import axios from 'axios';

const UpdateForm = ({ show, handleClose, review }) => {
  const [reviewText, setReviewText] = useState('');
  const { reviews, setReviews } = useContext(movieContext);

  const updateReview = async (id) => {
    // Create review object
    const updatedReviewData = {
      reviewText: reviewText
    };

    console.log(id);
    // make an axios call to send the review ID to the backend
    try {
      let response = await axios({
        method: "PUT",
        url: `/server/update/${id}`,
        data: updatedReviewData
      });
      console.log("trying to update review", response.data);

      // Update the reviews array with the updated data
      let newReviews = reviews.map((item) => {
        if (item._id === id) {
          return { ...item, ...response.data }; // assuming response.data is the updated review
        }
        return item;
      });

      setReviews(newReviews);
      handleClose();
    } catch (err) {
      console.log("error UPDATING review", err);
      handleClose();
    }
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update The Review!{review.title}</Modal.Title>
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
        <Button variant="primary" onClick={() => updateReview(review._id)}>
          Update Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateForm;
