import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const initializeDatabase = async () => {
  const db = await open({ filename: "./inventory.db", driver: sqlite3.Database });

  // Create Products Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      size TEXT,
      weight TEXT,
      unique_id TEXT UNIQUE,
      qr_code TEXT
    );
  `);

  // Create Boxes Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS boxes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      product_ids TEXT,
      unique_id TEXT UNIQUE,
      qr_code TEXT
    );
  `);

  return db;
};
