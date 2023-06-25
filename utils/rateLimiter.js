import rateLimit from "express-rate-limit"

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message:
    "Превышено количество запросов. Пожалуйста, повторите попытку позже.",
})

export { limiter }
