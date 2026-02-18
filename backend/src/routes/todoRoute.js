import express from "express"
import { addTodo, deleteTodo, getAllTodo, updateTodo } from "../controllers/todoController.js"
import { hasToken } from "../middleware/hasToken.js"
import { todoSchema, validateTodo } from "../../validators/todoValidate.js"

const todoRoute = express.Router()

todoRoute.post("/create", hasToken,validateTodo(todoSchema), addTodo)
todoRoute.get("/getAll", hasToken, getAllTodo)
todoRoute.delete("/delete/:id", hasToken, deleteTodo)
todoRoute.put("/update/:id", hasToken, updateTodo)

export default todoRoute