import React, { useState, useEffect } from "react";
import Car from "./Car";
//import Data from "./assets/vehicles_dataset.json";
import CarDetails from "./CarDetails";
import "./App.css";

function App() {
  const [carsPerPage, setCarsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCarIndex, setSelectedCarIndex] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const startIndex = currentPage * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/cars");
      if (!response.ok) throw new Error("Failed to fetch vehicle data");
      const vehicles = await response.json();
      setData(vehicles);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  fetchData();
}, []);


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
        const updatedCar = result.updatedCar;
  
        // Update the data state
        setData((prevData) => {
          const updatedData = [...prevData];
          updatedData[index] = updatedCar; // Replace the car at the given index
          return updatedData;
        });
  
        // Update selectedCar too if it's the one we're modifying
        if (selectedCarIndex === index) {
          setSelectedCar(updatedCar);
        }
  
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

  const filteredData = data.filter((car) => {
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
    <div className="app-container">
      {/* Sort and filter */}
      <div className="fixed-toolbar">
        <div>
          <div className="sort-section">
            <label className="label-white-bold">
              Sort by:
            </label>
            <select
              value={sortField || ""}
              onChange={(e) => setSortField(e.target.value || null)}
              className="input-field"
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
              className="button-icon"
            >
              {sortOrder === "asc" ? "⬆️" : "⬇️"}
            </button>
          </div>
        </div>

        <div>
          <div className="filter-section">
            <label className="label-white-bold">
              Filter by:
            </label>
            <input
              type="text"
              placeholder="Make"
              value={filterMake}
              onChange={(e) => setFilterMake(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Model"
              value={filterModel}
              onChange={(e) => setFilterModel(e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Min Bid"
              value={filterMinBid}
              onChange={(e) => setFilterMinBid(e.target.value)}
              className="input-field small"
            />
            <input
              type="number"
              placeholder="Max Bid"
              value={filterMaxBid}
              onChange={(e) => setFilterMaxBid(e.target.value)}
              className="input-field small"
            />
            <label className="label-white">
              <input
                type="checkbox"
                checked={showFavouritesOnly}
                onChange={(e) => setShowFavouritesOnly(e.target.checked)}
              />
              Favourites only
            </label>
          </div>
        </div>
      </div>

      <div className="top-spacing" />
      {carsToDisplay.map((car, index) => (
        <div key={startIndex + index}>
          <Car {...car} />
          <div className="action-group">
            <button
              onClick={() => openDetails(car, startIndex + index)}
              className="action-button"
            >
              Show Info
            </button>
            <button
              onClick={() => toggleFavourite(startIndex + index)}
              className="action-button"
            >
              {car.favourite ? "★ Fav" : "☆ Fav"}
            </button>
          </div>
          <hr className="divider" />
        </div>
      ))}

      {showDetails && selectedCar && (
        <CarDetails
          car={selectedCar}
          onClose={closeDetails}
          onToggleFavourite={() => toggleFavourite(selectedCarIndex)}
        />
      )}

      <div className="fixed-pagination">
        <select
          value={carsPerPage}
          onChange={handleCarsPerPageChange}
          className="input-field"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span className="page-info">
          Page {currentPage + 1} of {Math.ceil(totalCars / carsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.floor(totalCars / carsPerPage) - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
