import yup from "yup"

export const todoSchema = yup.object({
    title: yup
    .string()
    .trim()
    .min(5, "Title must be atleast 5 characters")
    .max(10, "Title must be atmost 10 characters")
    .required()
})

export const validateTodo = (schema) => async(req, res, next) => {
    try {
        await schema.validate(req.body)
        next()
    } catch (err) {
        return res.status(400).json({ errors: err.errors })
    }
}