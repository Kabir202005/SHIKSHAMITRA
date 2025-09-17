import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// YouTube search
router.get("/youtube", async (req, res) => {
  try {
    const query = req.query.q;
    const response = await fetch(
      `https://api.apify.com/v2/acts/apify~youtube-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery: query }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "YouTube search failed" });
  }
});

// Google search
router.get("/google", async (req, res) => {
  try {
    const query = req.query.q;
    const response = await fetch(
      `https://api.apify.com/v2/acts/apify~google-search-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Google search failed" });
  }
});

export default router;
