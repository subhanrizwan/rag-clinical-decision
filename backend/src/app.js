import "dotenv/config";
import express from "express";
import "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);


app.get("/api", (req, res) => {
    res.send("Api is running");
});

console.log("JWT Secret Loaded:", !!process.env.JWT_SECRET);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});