const service = require("./movies.service");
const mapProperties = require("../utils/map-properties");

const configuration = {
  critic_id: "critic.category_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
};

const addCategory = mapProperties({
  critic_id: "critic.category_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// Check if movie exists
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }

  next({ status: 404, message: `Movie cannot be found.` });
}

// list all movies
async function list(req, res) {
  const { is_showing } = req.query;

  if (is_showing) {
    const data = await service.listShowing();
    res.json({
      data,
    });
  } else {
    const data = await service.list();
    res.json({
      data,
    });
  }
}

// List one specific movie
async function read(req, res) {
  const data = res.locals.movie;
  res.json({
    data,
  });
}

// List theaters with movie
async function movieShowings(req, res) {
  const movie = res.locals.movie;
  const data = await service.movieShowings(movie.id);

  res.json({
    data,
  });
}

// List reviews of movie

async function movieReviews(req, res) {
  const movie = res.locals.movie;
  const result = await service.movieReviews(movie.id);
  const data = result.map(mapProperties(configuration));

  res.json({
    data,
  });
}

module.exports = {
  list,
  read: [movieExists, read],
  movieShowings: [movieExists, movieShowings],
  movieReviews: [movieExists, movieReviews],
};
