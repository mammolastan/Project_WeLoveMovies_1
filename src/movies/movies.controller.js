const service = require("./movies.service");

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
  const data = await service.movieReviews(movie.id);

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
