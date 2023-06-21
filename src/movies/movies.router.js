const router = require("express").Router();
const controller = require("./movies.controller");

router.route("/").get(controller.list);

router.route("/:movieId").get(controller.read);

router.route("/:movieId/theaters").get(controller.movieShowings);

router.route("/:movieId/reviews").get(controller.movieReviews);

module.exports = router;
