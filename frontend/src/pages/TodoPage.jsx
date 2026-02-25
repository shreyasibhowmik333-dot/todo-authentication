import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteModal from '../components/DeleteModal'
import EditModal from '../components/EditModal'
import toast from "react-hot-toast"

const TodoPage = () => {
    const navigate = useNavigate()

    const [todo, setTodo] = useState([])
    const [text, setText] = useState("")
    const [userName, setUserName] = useState("")

    const [delModal, setDelModal] = useState(false)
    const [todoId, setTodoId] = useState()

    const [updateModal, setUpdateModal] = useState(false)
    const [selectText, setSelectText] = useState(null)

    // ✅ Check login + get username
    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        const name = localStorage.getItem("name")

        if (!token) {
            navigate("/") 
        } else {
            setUserName(name)
            getAll()
        }
    }, [])

    // ✅ Fetch all todos
    const getAll = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            const response = await axios.get(
                "http://localhost:8004/todo/getAll",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            setTodo(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    // ✅ Add new todo
    const addText = async () => {
        if (!text.trim()) return

        try {
            const accessToken = localStorage.getItem("accessToken")

            const data = {
                title: text
            }

            await axios.post(
                "http://localhost:8004/todo/create",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            setText("")
            getAll()
        } catch (error) {
            console.log(error)
        }
    }

    // ✅ Logout
    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("name")
        localStorage.removeItem("loginStatus")
        navigate("/") // go back to home page
        toast.success("Logged out successfully")
    }

    const handleUpdate = (item) => {
        setUpdateModal(true)
        setSelectText(item)
    }

    return (
        <div>

            {/* Header */}
            <div className='flex w-80 gap-5 m-auto justify-between mt-10 border shadow-md p-2'>
                <div className="font-semibold text-cyan-700">
                    {userName}
                </div>
                <button
                    onClick={handleLogout}
                    className="text-red-600 font-semibold"
                >
                    Logout
                </button>
            </div>

            {/* Title */}
            <div className='text-center text-3xl text-cyan-700 m-10 font-semibold'>
                TodoPage
            </div>

            {/* Add Todo */}
            <div className='flex gap-3 justify-center mb-5'>
                <input
                    className='w-64 border border-cyan-800 rounded p-2'
                    type="text"
                    placeholder='Add Todo'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    className='w-16 rounded bg-cyan-100 p-2'
                    onClick={addText}
                >
                    Add
                </button>
            </div>

            {/* Todo List */}
            {
                todo.map((item) => (
                    <div key={item._id} className='w-80 m-auto mt-1 flex justify-between items-center'>
                        <p className='w-64'>{item.title}</p>

                        <div className="flex gap-3">
                            <button onClick={() => handleUpdate(item)}>
                                <i className="fa-solid fa-pen-to-square text-cyan-700"></i>
                            </button>

                            <button
                                onClick={() => {
                                    setDelModal(true)
                                    setTodoId(item._id)
                                }}
                            >
                                <i className="fa-solid fa-trash text-red-600"></i>
                            </button>
                        </div>
                    </div>
                ))
            }

            {/* Modals */}
            {delModal &&
                <DeleteModal
                    setDelModal={setDelModal}
                    todoId={todoId}
                    getAll={getAll}
                />
            }

            {updateModal &&
                <EditModal
                    setUpdateModal={setUpdateModal}
                    selectText={selectText}
                    getAll={getAll}
                />
            }

        </div>
    )
}

export default TodoPage