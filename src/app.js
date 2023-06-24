if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// Not found handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
