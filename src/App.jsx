import React, { useState } from "react";
import Car from "./Car";
import Data from "./assets/vehicles_dataset.json";
import CarDetails from "./CarDetails";

function App() {
  const [carsPerPage, setCarsPerPage] = useState(10);
  const totalCars = Data.length;
  const [currentPage, setCurrentPage] = useState(0);

  const [selectedCar, setSelectedCar] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const startIndex = currentPage * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const carsToDisplay = Data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < Math.floor(totalCars / carsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCarsPerPageChange = (event) => {
    setCarsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const openDetails = (car) => {
    setSelectedCar(car);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedCar(null);
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        paddingBottom: "50px",
      }}
    >
      {carsToDisplay.map((car, index) => (
        <div key={startIndex + index}>
          <Car {...car} />
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={() => openDetails(car)}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              Show Info
            </button>
            <div>Fav</div>
          </div>
          <hr style={{ marginTop: "10px", marginBottom: "20px" }} />
        </div>
      ))}

      {/* Details */}
      {showDetails && selectedCar && (
        <CarDetails car={selectedCar} onClose={closeDetails} />
      )}

      {/* Pagination controls */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "chocolate",
          padding: "10px 0",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <select
          value={carsPerPage}
          onChange={handleCarsPerPageChange}
          style={{ padding: "5px", marginRight: "20px" }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage + 1} of {Math.ceil(totalCars / carsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.floor(totalCars / carsPerPage) - 1}
        >
          Next
        </button>
      </div>
      {/* --------------*/}
    </div>
  );
}

export default App;
