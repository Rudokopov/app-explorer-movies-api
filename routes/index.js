import express from "express"
import { checkAuth } from "../middlewares/auth.js"
import { NotFoundError } from "../customErrors/customErrors.js"
import {
  validateRegister,
  validateLogin,
  validateCreateMovie,
  validateMovieId,
  validateProfile,
} from "../middlewares/validate.js"

const router = express.Router()

// import routes for user
import {
  getUserMe,
  updateUser,
  createUser,
  login,
} from "../controllers/user.js"

// import routes for movies
import {
  getUserMovies,
  createNewMovie,
  deleteMovieById,
  addToFavoriteMovie,
  removeFromFavoriteMovie,
} from "../controllers/movie.js"

// routes for user
router.post("/signin", validateLogin, login)
router.post("/signup", validateRegister, createUser)
router.get("/users/me", checkAuth, getUserMe)
router.patch("/users/me", checkAuth, validateProfile, updateUser)

// routes for movies
router.get("/movies", checkAuth, getUserMovies)
router.post("/movies", checkAuth, validateCreateMovie, createNewMovie)
router.delete("/movies", checkAuth, deleteMovieById)
router.put("/movies/favorite/:id", checkAuth, addToFavoriteMovie)
router.delete("/movies/favorite/:id", checkAuth, removeFromFavoriteMovie)

router.all("*", (req, res, next) => {
  next(new NotFoundError("Такого адреса не существует"))
})

export { router }
