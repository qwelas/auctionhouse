import React, { useEffect, useRef } from "react";
import carPlaceholder from "./assets/car.png";

function CarDetails({ car, onClose }) {
  
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
    <div
      onClick={handleClickOutside}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        ref={modalRef}
        style={{
          display: "grid",
          placeItems: "center",
          backgroundColor: "black",
          padding: "20px",
          borderRadius: "8px",
          width: "50%",
          position: "relative",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>

        {/* Should the field not show if there it not defined or should a placeholder value like "N/A" be used? */}
        <img
          src={carPlaceholder}
          alt="Car Image Placeholder"
          width="100%"
          height="100%"
          style={{ maxWidth: "400px", maxHeight: "400px" }}
        />
        <h2>
          {car.make} {car.model}
        </h2>
        <ul>
          <li>Year: {car.year}</li>
          <li>Mileage: {car.mileage} km</li>
          <li>Auction Date: {car.auctionDateTime}</li>
          <li>Starting Bid: {car.startingBid} €</li>
          {/* Todo make time remaining function global*/}
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
          <li>
            NOx Emissions: {car.details?.specification?.noxEmissions} mg/km
          </li>
          <li>Number of Keys: {car.details?.specification?.numberOfKeys}</li>
        </ul>

        <h3>Ownership</h3>
        <ul>
          <li>Log Book: {car.details?.ownership?.logBook}</li>
          <li>Number of Owners: {car.details?.ownership?.numberOfOwners}</li>
          <li>
            Date of Registration: {car.details?.ownership?.dateOfRegistration}
          </li>
        </ul>

        <h3>Equipment</h3>
        <ul>
          {car.details?.equipment?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CarDetails;
