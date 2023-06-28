const knex = require("../db/connection");
const tableName = "movies";

function list() {
  return knex(tableName).select();
}

function listShowing() {
  return knex(`${tableName} as m`)
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("*")
    .where({ "mt.is_showing": true });
}

function read(movie_id) {
  return knex("movies")
    .select(
      "movie_id as id",
      "title",
      "runtime_in_minutes",
      "rating",
      "description",
      "image_url"
    )
    .where({ movie_id })
    .first();
}

function movieShowings(movie_id) {
  return knex(`${tableName} as m`)
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select(
      "t.theater_id",
      "t.name",
      "t.address_line_1",
      "t.address_line_2",
      "t.city",
      "t.state",
      "t.zip",
      "t.created_at",
      "t.updated_at",
      "mt.is_showing",
      "mt.movie_id"
    )
    .where({ "mt.movie_id": movie_id });
}

function movieReviews(movie_id) {
  return knex(`reviews as r`)
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movie_id });
}

module.exports = {
  list,
  listShowing,
  read,
  movieShowings,
  movieReviews,
};
