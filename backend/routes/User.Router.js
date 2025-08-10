import express from "express";
import { getUser, updateUser } from "../controllers/User.Controller.js";
import upload from "../config/multer.js";

const userRoute = express.Router()

userRoute.get("/get-user/:userid", getUser)
userRoute.put("/update-user/:userid", upload.single("file"), updateUser)


export default userRoute