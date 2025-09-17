import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchRoutes from "./routes/search.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
