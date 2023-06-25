import { NotFoundError } from "../customErrors/customErrors.js"
import Movie from "../models/movie.js"
import mongoose from "mongoose"

export const getUserMovies = async (req, res, next) => {
  try {
    const userId = req.userId
    console.log(userId)
    const movies = await Movie.find({ owner: userId })
    res.send(movies)
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
    const movieId = req.body.movieId

    await Movie.findOneAndDelete({
      movieId: movieId,
      owner: userId,
    })

    // Получите обновленный список фильмов после удаления
    const updatedMovies = await Movie.find({ owner: userId })

    res.send(updatedMovies)
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
      throw new NotFoundError("Фильм с похожим ID не найдена")
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
      throw new NotFoundError("Фильм с похожим ID не найдена")
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
