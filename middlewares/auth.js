import jwt from "jsonwebtoken"
import { UnauthorizedError } from "../customErrors/customErrors.js"

const checkAuth = async (req, res, next) => {
  const jwtToken = req.headers.authorization
  if (!jwtToken) {
    return next(new UnauthorizedError("У вас нет доступа"))
  }
  const token = jwtToken.replace(/Bearer\s/, "")
  try {
    const decoded = jwt.verify(token, "monkey-is-not-bear")
    req.userId = decoded._id
    next()
  } catch (err) {
    next(new UnauthorizedError("У вас нет доступа"))
    return
  }
}

export { checkAuth }
