const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connection');
const imageRoutes = require('./routes/route');

const app = express();

//config
dotenv.config({ path: "./.env" });

// connection
connectDB();

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", imageRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT:${process.env.PORT}`)
})