import { Joi, celebrate } from "celebrate"

const checkLink =
  /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/

const handleErrors = (err, req, res, next) => {
  const { statusCode = 500 } = err
  let { message } = err

  if (statusCode === 500) {
    message = "Внутренняя ошибка сервера"
  }

  res.send(statusCode, { message })
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
    image: Joi.string().required().pattern(checkLink),
    trailerLink: Joi.string().required().pattern(checkLink),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(checkLink),
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
