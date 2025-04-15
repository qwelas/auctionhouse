import React, { useState, useEffect } from "react";
import carPlaceholder from "./assets/car.png";
import "./Car.css";

function Car({
  make = "Unknown",
  model = "Unknown",
  year = "Unknown",
  mileage = "Unknown",
  auctionDateTime = "Unknown",
  startingBid = "Unknown",
}) {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const auctionDate = new Date(auctionDateTime);
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = auctionDate - now;

      if (timeDiff < 0) {
        setTimeRemaining("Over!");
      } else {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionDateTime]);

  return (
    <div>
      <img src={carPlaceholder} alt="Car Image Placeholder" className="car-image" />
      <ul>
        <li>Make: {make}</li>
        <li>Model: {model}</li>
        <li>Year: {year}</li>
        <li>Mileage: {mileage} km</li>
        <li>Auction Date: {auctionDateTime}</li>
        <li>StartingBid: {startingBid} €</li>
        <li>Time Remaining: {timeRemaining}</li>
      </ul>
    </div>
  );
}

export default Car;
