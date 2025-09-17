// backend/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Replace with your actor name & token
const APIFY_TOKEN = "YOUR_APIFY_TOKEN";
const YT_ACTOR = "perceptive_xylulose~youtube-scraper-task";

// API endpoint to search YouTube via Apify
app.get("/api/search/youtube", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing search query" });

  try {
    const response = await axios.post(
      `https://api.apify.com/v2/acts/${YT_ACTOR}/runs?token=${APIFY_TOKEN}`,
      {
        searchQuery: q,
        maxResults: 10 // adjust how many results you want
      }
    );

    // Wait a few seconds for the actor to start, then fetch results
    const runId = response.data.data.id;

    const runResult = await axios.get(
      `https://api.apify.com/v2/acts/${YT_ACTOR}/runs/${runId}/dataset/items?token=${APIFY_TOKEN}`
    );

    res.json(runResult.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch YouTube videos" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
