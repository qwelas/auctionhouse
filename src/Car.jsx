import React, { useState, useEffect } from "react";
import carPlaceholder from "./assets/car.png";
import "./Car.css";
import timeRemainingCalc from "./timeRemainingCalc";

function Car({
  make = "Unknown",
  model = "Unknown",
  year = "Unknown",
  mileage = "Unknown",
  auctionDateTime = "Unknown",
  startingBid = "Unknown",
}) {
  const timeRemaining = timeRemainingCalc(auctionDateTime);

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
