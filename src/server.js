require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../db/connection");
const multer = require("multer");
const {
  deleteRestaurant,
  getRestaurantList,
  addOrUpdateRestaurant,
} = require("./services/restaurantServices");

const port = process.env.PORT || 5000;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});
const app = express();

// cors config
app.use(
  cors({
    origin: ["http://localhost:3000" ,"https://foodie-delight-one.vercel.app"],
    allowedHeaders: ["Content-Type"],
    credentials:true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

// connect to MongoDB
connectDB();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/api/health", (req, res) => {
  console.log("Server V1.3 deployed.");
  return res.send("Server v1.3 deployed");
});
app.get("/api/getRestaurantList", getRestaurantList);
app.post(
  "/api/saveRestaurant",
  upload.single("featuredImage"),
  addOrUpdateRestaurant
);
app.put(
  "/api/saveRestaurant",
  upload.single("featuredImage"),
  addOrUpdateRestaurant
);
app.delete("/api/deleteRestaurant", deleteRestaurant);

app.listen(port, () => console.log(`Server listening on port ${port}`));
