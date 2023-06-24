const router = require("express").Router();
const knex = require("../db/connection");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(list).all(methodNotAllowed);

function getAllTheaters() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("*")
    .groupBy("t.theater_id");
}

async function list(req, res) {
  const data = await getTheatersWithMovies();
  res.json({
    data,
  });
}

async function getTheatersWithMovies() {
  const data = await knex("theaters as t")
    .select(
      "t.theater_id",
      "t.name",
      "t.address_line_1",
      "t.address_line_2",
      "t.city",
      "t.state",
      "t.zip",
      "t.created_at",
      "t.updated_at"
    )
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "m.created_at",
      "m.updated_at",
      "mt.theater_id",
      "mt.is_showing"
    );

  const theatersWithMovies = data.reduce((acc, theater) => {
    const existingTheater = acc.find(
      (t) => t.theater_id === theater.theater_id
    );
    const movie = {
      movie_id: theater.movie_id,
      title: theater.title,
      runtime_in_minutes: theater.runtime_in_minutes,
      rating: theater.rating,
      description: theater.description,
      image_url: theater.image_url,
      created_at: theater.created_at,
      updated_at: theater.updated_at,
      is_showing: theater.is_showing,
      theater_id: theater.theater_id,
    };

    if (existingTheater) {
      existingTheater.movies.push(movie);
    } else {
      acc.push({
        theater_id: theater.theater_id,
        name: theater.name,
        address_line_1: theater.address_line_1,
        address_line_2: theater.address_line_2,
        city: theater.city,
        state: theater.state,
        zip: theater.zip,
        created_at: theater.created_at,
        updated_at: theater.updated_at,
        movies: [movie],
      });
    }

    return acc;
  }, []);

  return theatersWithMovies;
}

module.exports = router;
