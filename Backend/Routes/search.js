import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// 🔎 YouTube Search
router.get("/youtube", async (req, res) => {
  try {
    const query = req.query.q; // search query from frontend

    // Call Apify YouTube Scraper actor
    const response = await fetch(`https://api.apify.com/v2/acts/apify~youtube-scraper/run-sync-get-dataset-items?token=YOUR_APIFY_TOKEN`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchQuery: query })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch YouTube results" });
  }
});

// 🔎 Google Search
router.get("/google", async (req, res) => {
  try {
    const query = req.query.q;

    const response = await fetch(`https://api.apify.com/v2/acts/apify~google-search-scraper/run-sync-get-dataset-items?token=YOUR_APIFY_TOKEN`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Google search failed" });
  }
});

export default router;
