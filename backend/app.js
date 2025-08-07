import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import AuthRoute from "./routes/AuthRoute.js"

dotenv.config()
const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

// database connection
mongoose.connect(process.env.MONGODB_CONN, { dbName: "blogify" }).then(() => {
  console.log("Connected to MongoDB")
}).catch((err) => {
  console.log(err)
})

// route setup
app.use("/backend/auth", AuthRoute)




const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const message = error.message || "Internal Server Error "
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})