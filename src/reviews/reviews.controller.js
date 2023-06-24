const service = require("./reviews.service");

// Check if review exists
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }

  next({ status: 404, message: `Review cannot be found.` });
}

async function update(req, res) {
  const { review } = res.locals;

  const updatedReview = {
    ...review,
    ...req.body.data,
    review_id: review.review_id,
  };

  const data = await service.update(updatedReview);
  const thisCritic = await service.lookUpCritic(updatedReview.critic_id);
  data[0].critic = thisCritic;
console.log("data")
console.log(data)
  res.json({ data });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await service.destroy(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  delete: [reviewExists, destroy],
  update: [reviewExists, update],
};
