const knex = require("../db/connection");

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

function lookUpCritic(critic_id) {
  console.log("critic_id")
  console.log(critic_id)
  return knex("critics").select("*").where({ critic_id })
  .first();
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  read,
  destroy,
  update,
  lookUpCritic,
};
