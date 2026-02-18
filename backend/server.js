import express from "express"
import dotenv from "dotenv/config"
import { dbConnect } from "./src/config/dbConnect.js"
import userRoute from "./src/routes/userRoute.js"
import todoRoute from "./src/routes/todoRoute.js"
import cors from "cors"

const app = express()
const port = process.env.PORT

dbConnect()

app.use(express.json())
app.use(cors())

app.use("/user", userRoute) 
app.use("/todo", todoRoute) 

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)    
})



