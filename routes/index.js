import express from "express";
import { checkAuth } from "../middlewares/auth.js";
import { NotFound } from "../customErrors/customErrors.js";

const router = express.Router();

// import routes for user
import { getUserMe, updateUser } from "../controllers/user.js";

// import routes for movies
import {
  getUserMovies,
  createNewMovie,
  deleteMovieById,
} from "../controllers/movie.js";

// routes for user
router.get("/users/me", checkAuth, getUserMe);
router.patch("/users/me", checkAuth, updateUser);

// routes for movies
router.get("/movies", checkAuth, getUserMovies);
router.post("/movies", checkAuth, createNewMovie);
router.delete("/movies/:id", checkAuth, deleteMovieById);
