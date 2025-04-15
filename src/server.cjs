const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 5000;
const DATA_PATH = "./assets/vehicles_dataset.json";

app.use(cors());
app.use(express.json());

app.get("/cars", (req, res) => {
  try {
    const raw = fs.readFileSync(DATA_PATH);
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error("Error reading car data:", err);
    res.status(500).json({ error: "Failed to load car data." });
  }
});

app.post("/toggle-favourite", (req, res) => {
  const { index } = req.body;

  if (typeof index !== "number") {
    return res.status(400).json({ error: "Index is required and must be a number." });
  }

  try {
    const raw = fs.readFileSync(DATA_PATH);
    const data = JSON.parse(raw);

    if (!data[index]) {
      return res.status(404).json({ error: "Car not found at that index." });
    }

    data[index].favourite = !data[index].favourite;

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    res.json({ message: "Favourite updated!", updatedCar: data[index] });

  } catch (err) {
    console.error("Error updating file:", err);
    res.status(500).json({ error: "Failed to update file." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
