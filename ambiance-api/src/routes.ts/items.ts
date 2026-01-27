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
  const { name, price, description, image_url } = req.body;

  if (!name || !price || !image_url) {
    return res.status(400).json({
      error: "name, price and image_url are required",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO items (name, price, description, image_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, price, description, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create item" });
  }
});

// PUT /items/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description, image_url } = req.body;

  try {
    const result = await pool.query(
      `UPDATE items
       SET name = $1,
           price = $2,
           description = $3,
           image_url = $4
       WHERE id = $5
       RETURNING *`,
      [name, price, description, image_url, id]
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

export default router;
