import express from "express";
import { initializeDatabase } from "./db.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let db;

initializeDatabase().then((database) => {
  db = database;
  console.log("Database initialized!");
});

// Add Product API
app.post("/add-product", async (req, res) => {
  const { name, size, weight, uniqueId, qrCode } = req.body;
  try {
    await db.run(
      "INSERT INTO products (name, size, weight, unique_id, qr_code) VALUES (?, ?, ?, ?, ?)",
      [name, size, weight, uniqueId, qrCode]
    );
    res.json({ message: "Product added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Box API
app.post("/add-box", async (req, res) => {
  const { name, productIds, uniqueId, qrCode } = req.body;
  try {
    await db.run(
      "INSERT INTO boxes (name, product_ids, unique_id, qr_code) VALUES (?, ?, ?, ?)",
      [name, productIds.join(","), uniqueId, qrCode]
    );
    res.json({ message: "Box added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch Product and Box Counts API
app.get("/counts", async (req, res) => {
  const productCount = (await db.get("SELECT COUNT(*) AS count FROM products")).count;
  const boxCount = (await db.get("SELECT COUNT(*) AS count FROM boxes")).count;
  res.json({ products: productCount, boxes: boxCount });
});

// Fetch All Products API
app.get("/products", async (req, res) => {
  const products = await db.all("SELECT * FROM products");
  res.json(products);
});

// Fetch All Boxes API
app.get("/boxes", async (req, res) => {
  const boxes = await db.all("SELECT * FROM boxes");
  res.json(boxes);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
