import { Joi, celebrate } from "celebrate"
import { linkValidate } from "../utils/linkValidate"

const handleErrors = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message

  if (statusCode === 500) {
    message = "Внутренняя ошибка сервера"
  }

  res.status(statusCode).send({ error: message })
}

const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
})

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
})

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkValidate),
    trailerLink: Joi.string().required().pattern(linkValidate),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(linkValidate),
    movieId: Joi.number().required(),
  }),
})

const validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
})

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
})

export {
  handleErrors,
  validateRegister,
  validateLogin,
  validateCreateMovie,
  validateMovieId,
  validateProfile,
}
