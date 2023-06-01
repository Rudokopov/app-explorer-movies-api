import User from "../models/user.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../customErrors/customErrors.js"

export const createUser = async (req, res, next) => {
  try {
    const { name, password, email } = req.body
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const newUser = await User.create({ name, email, passwordHash: hash })

    const result = newUser.toObject()
    delete result.passwordHash
    res.send(201, result)
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
    if (err.code === 11000) {
      next(new ConflictError("Такой email уже зарегестрирован"))
      return
    }
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+passwordHash")
    if (!user) {
      throw new UnauthorizedError("Пользователь с таким email не найден")
    }
    const isValid = await bcrypt.compare(password, user._doc.passwordHash)
    if (!isValid) {
      throw new UnauthorizedError("Email или Password введены неверно")
    }
    const { NODE_ENV, JWT_SECRET } = process.env
    const token = jwt.sign(
      {
        _id: user._id,
      },
      NODE_ENV === "production" ? JWT_SECRET : "monkey-is-not-bear",
      {
        expiresIn: "7d",
      }
    )
    const { passwordHash, ...userData } = user._doc
    res.send({
      ...userData,
      token,
    })
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
  }
}

export const getUserMe = async (req, res, next) => {
  try {
    const userId = req.userId
    const currentUser = await User.findById(userId)
    res.send(currentUser)
  } catch (err) {
    next(err)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.userId
    const { name, email } = req.body
    const currentUser = await User.findByIdAndUpdate(userId, { name, email })
    if (!currentUser) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
    if (err.code === 11000) {
      next(new ConflictError("Такой email уже зарегестрирован"))
      return
    }
    res.send(currentUser)
  } catch (err) {
    next(err)
  }
}
