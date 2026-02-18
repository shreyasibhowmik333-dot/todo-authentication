import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "todoUser_backend",
            required: true,
        },
        title: {
            type: String,
            required: true,
        }
    }, { timestamps: true }
)

export default mongoose.model("todoList_users", todoSchema)