import React from "react";
import "./review.css";

const Review = ({ avatar, cardImage, name, largeImage, videoLink, color }) => {
  console.log(largeImage);
  return (
    <div className="review-container m-auto">
      <div className="left">
        <div className="b-card">
          <img src={cardImage} alt="" />
        </div>
        <div className="video">
          <video src={videoLink} controls />
        </div>
      </div>
      <div className="right">
        <div className="info">
          <div className="head">
            <img src={avatar} alt="" />
            <span style={{ color: color }}>{name.split(" ").join("\n")}</span>
          </div>
          <div className="button-group">
            <img src="email.png" className="btn-touch" />
            <img src="phone.png" className="btn-touch" />
            <img src="facebook.png" className="btn-touch" />
          </div>
        </div>
        <div className="large-image">
          <img src={largeImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Review;
