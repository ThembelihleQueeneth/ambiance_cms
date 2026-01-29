import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();

// GET /items
router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM items ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// GET /items/:id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM items WHERE id = $1",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
});

// POST /items
router.post("/", async (req: Request, res: Response) => {
  const { name, price, description, image_url, category } = req.body;

  if (!name || !price || !image_url || !category) {
    return res.status(400).json({
      error: "name, price, image_url and category are required",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO items (name, price, description, image_url, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, price, description, image_url, category]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create item" });
  }
});

// PUT /items/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description, image_url, category } = req.body;

  try {
    const result = await pool.query(
      `UPDATE items
       SET name = $1,
           price = $2,
           description = $3,
           image_url = $4,
           category = $5
       WHERE id = $6
       RETURNING *`,
      [name, price, description, image_url,category, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
});

// DELETE /items/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM items WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// Metrics API
// GET /items/metrics
router.get("/metrics", async (_req: Request, res: Response) => {
  try {
    // Total items
    const totalRes = await pool.query("SELECT COUNT(*) FROM items");
    const totalItems = parseInt(totalRes.rows[0].count, 10);

    // Average price
    const avgRes = await pool.query("SELECT AVG(price) FROM items");
    const avgPrice = parseFloat(avgRes.rows[0].avg || "0");

    // Max price item
    const maxRes = await pool.query(
      "SELECT * FROM items ORDER BY price DESC LIMIT 1"
    );
    const maxItem = maxRes.rows[0] || null;

    // Min price item
    const minRes = await pool.query(
      "SELECT * FROM items ORDER BY price ASC LIMIT 1"
    );
    const minItem = minRes.rows[0] || null;

    // Count per category
    const categoryRes = await pool.query(
      "SELECT category, COUNT(*) as count FROM items GROUP BY category"
    );
    const categoryCounts = categoryRes.rows;

    res.json({
      totalItems,
      avgPrice,
      maxItem,
      minItem,
      categoryCounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});



export default router;
