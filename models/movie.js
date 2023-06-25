import mongoose from "mongoose"
import { linkValidate } from "../utils/linkValidate.js"

const movieSchema = new mongoose.Schema({
  duration: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: linkValidate,
      message: (props) => `${props.value} не является допустимой ссылкой!`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: linkValidate,
      message: (props) => `${props.value} не является допустимой ссылкой!`,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  movieId: {
    type: Number, // id фильма, который содержится в ответе сервиса MoviesExplorer.
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
})

export default mongoose.model("movie", movieSchema)
