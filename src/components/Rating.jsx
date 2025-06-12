// src/components/RatingComponent.jsx
import React, { useState, useEffect } from "react";
import axios from "../apis/";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const RatingComponent = ({ projectId, averageRating, isAuthenticated }) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(null);

  const handleRating = async (score) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to rate this project.");
      return;
    }

    try {
      await axios.post("/ratings/", { project_id: projectId, score });
      setUserRating(score);
      toast.success("Rating submitted successfully.");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("You have already rated this project.");
      } else {
        toast.error("Something went wrong while submitting the rating.");
      }
    }
  };

  return (
    <div className="rating-component">
      <h3 className="text-lg font-semibold">Average Rating: {averageRating?.toFixed(1) || 0} ⭐</h3>
      <div className="flex items-center space-x-2 mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-2xl transition-colors duration-200 ${
              (hoverRating || userRating) >= star ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingComponent;
