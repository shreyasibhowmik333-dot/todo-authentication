import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Verify from "./pages/Verify"
import TodoPage from "./pages/TodoPage"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/user/verify/:token" element={<Verify />}/>
        <Route path="/todopage" element={<TodoPage />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
