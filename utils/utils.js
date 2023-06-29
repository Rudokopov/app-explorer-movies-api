import jwt from "jsonwebtoken"
export const generateToken = (user) => {
  const payload = { _id: user._id }
  const secret = "monkey-is-not-bear"
  const options = { expiresIn: "7d" }

  return jwt.sign(payload, secret, options)
}
