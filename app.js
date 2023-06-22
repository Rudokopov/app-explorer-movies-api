import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { limiter } from "./utils/rateLimiter.js"
import dotenv from "dotenv"
import { router } from "./routes/index.js"
import celebrate from "celebrate"
import { corsOptions } from "./middlewares/corsOptions.js"
import { PORT, DATA_BASE } from "./config.js"
import { requestLogger, errorLogger } from "./middlewares/logger.js"
import { handleErrors } from "./middlewares/validate.js"

dotenv.config()

const app = express()
app.use(limiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(DATA_BASE)

app.use(requestLogger)
app.use(cors(corsOptions))
app.use(router)
app.use(errorLogger)
app.use(celebrate.errors())
app.use(handleErrors)

app.listen(PORT, () => {
  console.log("Ссылка на сервер")
})
