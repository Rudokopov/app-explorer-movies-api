import { NotFound } from "../customErrors/customErrors.js"
import Movie from "../models/movie.js"
import mongoose from "mongoose"

export const getUserMovies = async (req, res, next) => {
  try {
    const userId = req.userId
    console.log(userId)
    const movies = await Movie.find({})
    const currentMovies = movies.filter((item) =>
      item.favorites.includes(userId)
    )
    res.send(currentMovies)
  } catch (err) {
    next(err)
  }
}

export const createNewMovie = async (req, res, next) => {
  try {
    const userId = req.userId
    const movie = await Movie.create({ ...req.body, owner: userId })
    res.status(201).send(movie)
  } catch (err) {
    next(err)
  }
}

export const deleteMovieById = async (req, res, next) => {
  try {
    const userId = req.userId
    const movieId = req.params.id
    const movie = await Movie.findById(movieId).populate(["owner"])
    if (!movie) {
      throw new NotFound("Фильм с таким id не найден")
    }
    if (!Movie.owner.id === userId) {
      throw new AccessError("У вас недостаточно прав на удаление фильма")
    }
    await movie.deleteOne()
    res.send(movie)
  } catch (err) {
    next(err)
  }
}

export const addToFavoriteMovie = async (req, res, next) => {
  try {
    const ownerId = req.userId
    const movieId = req.params.id
    const response = await Movie.findByIdAndUpdate(
      movieId,
      { $addToSet: { favorites: ownerId } },
      { new: true }
    )
    if (!response) {
      throw new NotFound("Фильм с похожим ID не найдена")
    }
    res.send(response)
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}

export const removeFromFavoriteMovie = async (req, res, next) => {
  try {
    const ownerId = req.userId
    const movieId = req.params.id
    const response = await Movie.findByIdAndUpdate(
      movieId,
      { $pull: { favorites: ownerId } },
      { new: true }
    )
    if (!response) {
      throw new NotFound("Фильм с похожим ID не найдена")
    }
    res.send(response)
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}
