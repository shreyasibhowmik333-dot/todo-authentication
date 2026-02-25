import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";


const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState, reset } = useForm();
    const [toggle, setToggle] = useState(false);
    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:8004/user/login", data);
            if (res.data.success) {
                console.log(res.data)
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                localStorage.setItem("name", res.data.data.userName);
                localStorage.setItem("loginStatus", "true");
                toast.success("Logged In successfully");
                reset();
                navigate("/todopage")


            } else {
                toast.error(res.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unauthorized access detected, verify your credentials"
            );
            console.log(error)
        }
    };


    return (
        <>
            <div className="min-h-screen bg-purple-200 pt-20">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-96 m-auto p-8 bg-sky-100">
                        <p className="text-xl text-gray-600 text-center">
                            Welcome Back!
                        </p>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email Address
                            </label>
                            <input
                                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none"
                                type="email"
                                {...register("email")}
                                required
                            />
                            <p className="text-xs text-red-600 font-semibold h-6">
                                {formState.errors.email?.message}
                            </p>

                            <label className="text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>

                            {!toggle ? (
                                <div className="relative">
                                    <input
                                        className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none mt-2"
                                        type="password"
                                        {...register("password")}
                                        required

                                    />
                                    <FaEyeSlash
                                        className="absolute inset-y-3 right-2 w-[20px]"
                                        onClick={() => setToggle(true)}
                                    />

                                </div>
                            ) : (<div className="relative">
                                <input
                                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none mt-2"
                                    type="text"
                                    {...register("password")}
                                    required
                                />
                                <FaEye
                                    className="absolute inset-y-3 right-2 w-[20px]"
                                    onClick={() => setToggle(false)}
                                />
                            </div>)}
                            
                            <p className="text-xs text-red-600 font-semibold h-6">
                                {formState.errors.password?.message}
                            </p>
                        </div>

                        <div className="mt-8">
                            <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                                Login
                            </button>
                        </div>
                        <div className="text-center mt-5 font-semibold"><Link to="/">Back to Home Page</Link></div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;