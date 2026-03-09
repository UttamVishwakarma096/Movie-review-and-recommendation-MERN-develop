const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    releaseDate: {
      type: Date,
      required: false,
    },
    plot: {
      type: String,
      required: false,
    },
    hero: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artists",
      required: false,
    },
    heroine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artists",
      required: false,
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artists",
      required: false,
    },
    genre: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
    posters: {
      type: [],
      required: false,
    },
    trailer: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    cast: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "artists",
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("movies", movieSchema);
