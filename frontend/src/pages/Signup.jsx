import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const   Signup = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();


    const handleSignup = async (e) => {

        e.preventDefault();


        if (!username || !password || !confirmPassword) {
            alert("All fields are required");
            return;
        }


        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }


        try {

            const response = await axios.post(
                "http://localhost:8000/api/auth/signup",
                {
                    username,
                    password
                },
                {
                    withCredentials: true
                }
            );


            console.log(response);


            alert("Signup successful");

            navigate("/login");


        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Signup failed"
            );
        }

    };



    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">


                <h1 className="text-3xl font-bold text-center mb-6">
                    Signup
                </h1>



                <form 
                    onSubmit={handleSignup}
                    className="space-y-4"
                >


                    <div>

                        <label className="block mb-2 font-medium">
                            Username
                        </label>


                        <input
                            type="text"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />


                    </div>




                    <div>

                        <label className="block mb-2 font-medium">
                            Password
                        </label>


                        <input
                            type="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />


                    </div>





                    <div>

                        <label className="block mb-2 font-medium">
                            Confirm Password
                        </label>


                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />


                    </div>




                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Signup
                    </button>



                    <p className="text-center text-sm mt-4">

                        Already have an account?{" "}

                        <Link 
                            to="/login"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Login
                        </Link>

                    </p>


                </form>


            </div>

        </div>

    );
};


export default Signup;