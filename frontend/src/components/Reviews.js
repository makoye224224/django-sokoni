import React from 'react';

const Reviews = ({ reviews }) => {
    console.log(reviews)
  return (
    <div className="mt-2">
      {reviews.map((review, index) => (
        <div key={index} className="mb-1">
          <span className="fw-bold me-1">{review.username}</span>
          <span className="text-warning me-1">&#9733; {review.rating}</span>
          <span className="font-italic">"{review.comment}"</span>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
