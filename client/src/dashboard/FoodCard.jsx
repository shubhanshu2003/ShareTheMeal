
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaCartArrowDown, FaHome } from "react-icons/fa";
import "./FoodCard.css";

const FoodCard = ({ name, quantity, date, address, tag }) => {
  const id = import.meta.env.VITE_NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=${id}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          
          setImageUrl(data.results[0].urls.regular);
        } else {
         
          setImageUrl("https://via.placeholder.com/300");
        }
      } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
        setImageUrl("https://via.placeholder.com/300"); 
      }
    };

    fetchImage();
  }, [name, id]);

  return (
    <div>
      <div className="card">
        <p
          style={{
            position: "absolute",
            top: "0.5rem",
            left: "0.5rem",
            padding: "0.5rem 1rem",
            background: "#f5f5f5",
            color: "#333",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "0.5rem",
          }}
        >
          {tag ? tag : "food"}
        </p>
        <img
          className="foodcard-img"
          src={imageUrl}
          alt={`${name} Image`}
        />
        <div className="card-content">
          <h2 className="food-title">{name}</h2>
          <div className="food-details">
            <ul className="icons">
              <li>
                <span className="icons-name">
                  <FaCartArrowDown />
                </span>
                : {quantity} kg
              </li>
              <li>
                <span className="icons-name">
                  <FaCalendarAlt />
                </span>
                : {date}
              </li>
              <li>
                <span className="icons-name">
                  <FaHome />
                </span>
                : {address}
              </li>
            </ul>
          </div>
          <button className="food-btn">Check Status</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
