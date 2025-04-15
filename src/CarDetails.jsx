import React, { useEffect, useRef } from "react";
import carPlaceholder from "./assets/car.png";
import "./CarDetails.css";

function CarDetails({ car, onClose, onToggleFavourite }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!car) return null;

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div ref={modalRef} className="modal-content">
        <button onClick={onClose} className="close-button">✖</button>

        <img src={carPlaceholder} alt="Car Image Placeholder" className="car-image" />
        <h2>
          {car.make} {car.model}
        </h2>

        <ul>
          <li>Year: {car.year}</li>
          <li>Mileage: {car.mileage} km</li>
          <li>Auction Date: {car.auctionDateTime}</li>
          <li>Starting Bid: {car.startingBid} €</li>
          <li>Time Remaining: {car.timeRemaining}</li>
          <li>Engine Size: {car.engineSize}</li>
          <li>Fuel: {car.fuel}</li>
          <li>Favourite: {car.favourite ? "Yes" : "No"}</li>
        </ul>

        <h3>Specification</h3>
        <ul>
          <li>Vehicle Type: {car.details?.specification?.vehicleType}</li>
          <li>Colour: {car.details?.specification?.colour}</li>
          <li>Fuel: {car.details?.specification?.fuel}</li>
          <li>Transmission: {car.details?.specification?.transmission}</li>
          <li>Doors: {car.details?.specification?.numberOfDoors}</li>
          <li>CO₂ Emissions: {car.details?.specification?.co2Emissions}</li>
          <li>NOx Emissions: {car.details?.specification?.noxEmissions} mg/km</li>
          <li>Number of Keys: {car.details?.specification?.numberOfKeys}</li>
        </ul>

        <h3>Ownership</h3>
        <ul>
          <li>Log Book: {car.details?.ownership?.logBook}</li>
          <li>Number of Owners: {car.details?.ownership?.numberOfOwners}</li>
          <li>Date of Registration: {car.details?.ownership?.dateOfRegistration}</li>
        </ul>

        <h3>Equipment</h3>
        <ul>
          {car.details?.equipment?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <button onClick={onToggleFavourite} className={`favourite-button ${car.favourite ? "favourite" : ""}`}>
          {car.favourite ? "★ Unfavourite" : "☆ Favourite"}
        </button>
      </div>
    </div>
  );
}

export default CarDetails;
