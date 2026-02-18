import axios from 'axios'
import React, { useEffect, useState } from 'react'

const TodoPage = () => {
    const[todo, setTodo] = useState([])

    const getAll = async () => {
        const accessToken = localStorage.getItem("accessToken")
        const response = await axios.get("http://localhost:8004/todo/getAll", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(response)
        setTodo(response.data.data)
    }

    

    useEffect(() => {
        getAll()
    }, [])

    return (
        <>
        <div>TodoPage</div>

        {
            todo.map((item) => <p>{item.title}</p>)
        }
        </>
        
    )
}

export default TodoPage