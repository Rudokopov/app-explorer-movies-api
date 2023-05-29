import express from "express";
import { checkAuth } from "../middlewares/auth.js";
import { NotFound } from "../customErrors/customErrors.js";

const router = express.Router();

// import routes for user
import {
  getUserMe,
  updateUser,
  createUser,
  login,
} from "../controllers/user.js";

// import routes for movies
import {
  getUserMovies,
  createNewMovie,
  deleteMovieById,
} from "../controllers/movie.js";

// routes for user
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/users/me", checkAuth, getUserMe);
router.patch("/users/me", checkAuth, updateUser);

// routes for movies
router.get("/movies", checkAuth, getUserMovies);
router.post("/movies", checkAuth, createNewMovie);
router.delete("/movies/:id", checkAuth, deleteMovieById);

router.all("*", (req, res, next) => {
  next(new NotFound("Такого адреса не существует"));
});

export { router };
