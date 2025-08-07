import express from "express";
import { GoogleLogin, login, register } from "../controllers/AuthController.js";
const AuthRoute = express.Router()

AuthRoute.post("/register", register)
AuthRoute.post("/login", login)
AuthRoute.post("/google-login", GoogleLogin)

export default AuthRoute