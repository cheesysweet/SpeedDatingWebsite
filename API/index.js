import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { mongoDB } from "./constants.js";

// Mongo database url
const url = mongoDB;

// Mongo database connection
mongoose.connect(url, { useNewUrlParser: true });

// Create an Express application
const index = express();

index.use(cors()); // CORS-enabled for all origins!

index.use(express.json());

index.use(express.urlencoded({ extended: true }));

// Define the port the server will accept connections on
const port = process.env.PORT || 3000;

// Start the server
index.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});

// Specified routes for the collections in the database
import Profile from "./routes/Profile.js";
import Event from "./routes/Event.js";
import Meeting from "./routes/Meeting.js";
import ImageUpload from "./routes/images.js";
import Socket from "./routes/socket.js";

// keywords for the backend
index.use('/api/profile', Profile);
index.use('/api/event', Event);
index.use('/api/meeting', Meeting);
index.use('/api/socket', Socket);
index.use('/api/imageUpload', ImageUpload);
