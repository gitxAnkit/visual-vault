const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connection');
const imageRoutes = require('./routes/imageRoute');
const albumRoutes = require('./routes/albumRoutes');
const errorMiddleware = require("./middlewares/error");
// Config
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 4000;

// Database Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", imageRoutes);
app.use("/api/v1", albumRoutes);

// error middleware
app.use(errorMiddleware);

process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

const server = app.listen(port, () => {
    console.log(`Server started at PORT: ${port}`);
});
// Handling Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    console.error(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});
