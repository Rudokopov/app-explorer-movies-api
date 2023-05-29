import { NotFound } from "../customErrors/customErrors.js";
import Movie from "../models/movie.js";

export const getUserMovies = async (req, res, next) => {
  try {
    const userId = req.userId;
    const movies = await Movie.findById(userId);
    if (!movies) {
      throw new NotFound("Фильмы не найдены");
    }
    res.send(201, movies);
  } catch (err) {
    next(err);
  }
};

export const createNewMovie = async (req, res, next) => {
  try {
    const userId = req.userId;
    const movieParams = ({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body);
    const movie = await Movie.create(movieParams, { owner: userId });
  } catch (err) {
    next(err);
  }
};

export const deleteMovieById = async (req, res, next) => {
  try {
    const userId = req.userId;
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId).populate(["owner"]);
    if (!movie) {
      throw new NotFound("Фильм с таким id не найден");
    }
    if (!Movie.owner.id === userId) {
      throw new AccessError("У вас недостаточно прав на удаление фильма");
    }
    await Movie.deleteOne({ _id: movieId });
    res.send(movie);
  } catch (err) {
    next(err);
  }
};
