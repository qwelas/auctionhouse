import React, { useState, useEffect } from "react";
import Car from "./Car";
import Data from "./assets/vehicles_dataset.json";
import CarDetails from "./CarDetails";

function App() {
  const [carsPerPage, setCarsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCarIndex, setSelectedCarIndex] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const startIndex = currentPage * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // or "desc"

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

  const openDetails = (car, index) => {
    setSelectedCar(car);
    setSelectedCarIndex(index);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedCar(null);
  };

  const toggleFavourite = async (index) => {
    try {
      const response = await fetch("http://localhost:5000/toggle-favourite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index }),
      });

      if (response.ok) {
        const result = await response.json();
        Data[index].favourite = result.updatedCar.favourite;
        setSelectedCar({ ...result.updatedCar });
        setCurrentPage(currentPage);
      } else {
        console.error("Failed to toggle favourite");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [filterMake, setFilterMake] = useState("");
  const [filterModel, setFilterModel] = useState("");
  const [filterMinBid, setFilterMinBid] = useState("");
  const [filterMaxBid, setFilterMaxBid] = useState("");
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  const filteredData = Data.filter((car) => {
    const matchesMake =
      !filterMake || car.make.toLowerCase().includes(filterMake.toLowerCase());
    const matchesModel =
      !filterModel ||
      car.model.toLowerCase().includes(filterModel.toLowerCase());
    const matchesMinBid =
      !filterMinBid || car.startingBid >= parseFloat(filterMinBid);
    const matchesMaxBid =
      !filterMaxBid || car.startingBid <= parseFloat(filterMaxBid);
    const matchesFavourite = !showFavouritesOnly || car.favourite;

    return (
      matchesMake &&
      matchesModel &&
      matchesMinBid &&
      matchesMaxBid &&
      matchesFavourite
    );
  });

  const totalCars = filteredData.length;

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "auctionDateTime") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (typeof aValue === "string") aValue = aValue.toLowerCase();
    if (typeof bValue === "string") bValue = bValue.toLowerCase();

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const carsToDisplay = sortedData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(0);
  }, [sortField, sortOrder]);

  useEffect(() => {
    setCurrentPage(0);
  }, [filterMake, filterModel, filterMinBid, filterMaxBid, showFavouritesOnly]);

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        paddingBottom: "50px",
      }}
    >
      {/* Sort and filter */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "chocolate",
          padding: "10px 0",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          {/* Sort */}
          <div style={{ marginRight: "20px" }}>
            <label style={{ color: "white", marginRight: "5px", fontWeight: "bold"}}>
              Sort by:
            </label>
            <select
              value={sortField || ""}
              onChange={(e) => setSortField(e.target.value || null)}
              style={{ padding: "5px" }}
            >
              <option value="">None</option>
              <option value="make">Make</option>
              <option value="startingBid">Starting Bid</option>
              <option value="mileage">Mileage</option>
              <option value="auctionDateTime">Auction Date</option>
            </select>

            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              style={{
                marginLeft: "10px",
                padding: "5px",
                backgroundColor: "transparent",
                border: "0",
                cursor: "pointer",
              }}
            >
              {sortOrder === "asc" ? "⬆️" : "⬇️"}
            </button>
          </div>
        </div>

        <div>
          {/* Filter */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label style={{ color: "white", marginRight: "5px", fontWeight: "bold" }}>
              Filter by:
            </label>
            <input
              type="text"
              placeholder="Make"
              value={filterMake}
              onChange={(e) => setFilterMake(e.target.value)}
              style={{ padding: "5px" }}
            />
            <input
              type="text"
              placeholder="Model"
              value={filterModel}
              onChange={(e) => setFilterModel(e.target.value)}
              style={{ padding: "5px" }}
            />
            <input
              type="number"
              placeholder="Min Bid"
              value={filterMinBid}
              onChange={(e) => setFilterMinBid(e.target.value)}
              style={{ padding: "5px", width: "80px" }}
            />
            <input
              type="number"
              placeholder="Max Bid"
              value={filterMaxBid}
              onChange={(e) => setFilterMaxBid(e.target.value)}
              style={{ padding: "5px", width: "80px" }}
            />
            <label style={{ color: "white" }}>
              <input
                type="checkbox"
                checked={showFavouritesOnly}
                onChange={(e) => setShowFavouritesOnly(e.target.checked)}
                style={{ marginRight: "5px" }}
              />
              Favourites only
            </label>
          </div>
        </div>
      </div>
      {/* --------------*/}

      <div style={{ marginTop: "50px", marginBottom: "20px" }} />
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
              onClick={() => openDetails(car, startIndex + index)}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              Show Info
            </button>
            <button onClick={() => toggleFavourite(startIndex + index)}>
              {car.favourite ? "★ Fav" : "☆ Fav"}
            </button>
          </div>
          <hr style={{ marginTop: "10px", marginBottom: "20px" }} />
        </div>
      ))}

      {/* Details */}
      {showDetails && selectedCar && (
        <CarDetails
          car={selectedCar}
          onClose={closeDetails}
          onToggleFavourite={() => toggleFavourite(selectedCarIndex)}
        />
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
