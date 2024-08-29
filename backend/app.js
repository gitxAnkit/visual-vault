const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connection');
const imageRoutes = require('./routes/route');
const errorMiddleware = require("./middlewares/error");
const app = express();
const albumRoutes = require("./routes/albumRoutes")
//config
dotenv.config({ path: "./.env" });
// connection
connectDB();

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// error middleware
app.use(errorMiddleware);


// routes
app.use("/", imageRoutes);
app.use("/", albumRoutes);

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    process.exit(1);
})


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT}`);
});
// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Uhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});