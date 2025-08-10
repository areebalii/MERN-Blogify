import { handleError } from "../helpers/handelError.js"
import User from "../model/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const checkUser = await User.findOne({ email })
    if (checkUser) {
      // user Already exist
      return next(handleError(409, "User Already registered"))
    }
    const hashPassword = bcryptjs.hashSync(password)
    const user = new User({
      name, email, password: hashPassword
    })
    await user.save()
    res.status(200).json({
      success: true,
      message: "User registered successfully"
    })

  } catch (error) {
    next(handleError(500, error.message))
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return next(handleError(404, "Invalid login data"))
    }
    const hashPassword = user.password
    const comparePassword = await bcryptjs.compare(password, hashPassword)
    if (!comparePassword) {
      return next(handleError(404, "Invalid login data"))
    }

    const token = jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }, process.env.JWT_SECRET_KEY)

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    })

    let newUser = user.toObject({ getters: true })
    delete newUser.password

    res.status(200).json({
      success: true,
      message: "login successfully",
      user: newUser
    })

  } catch (error) {
    next(handleError(500, error.message))
  }
}
export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      // create new User
      const password = await Math.random().toString(36).slice(2)
      const hashPassword = bcryptjs.hashSync(password)
      const newUser = new User({
        name, email, password: hashPassword, avatar
      })
      user = await newUser.save()
    }


    const token = jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }, process.env.JWT_SECRET_KEY)

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    })

    let newUser = user.toObject({ getters: true })
    delete newUser.password

    res.status(200).json({
      success: true,
      message: "login successfully",
      user: newUser
    })

  } catch (error) {
    next(handleError(500, error.message))
  }
}
export const Logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token",  {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    })

    res.status(200).json({
      success: true,
      message: "Logout successfully",
    })

  } catch (error) {
    next(handleError(500, error.message))
  }
}