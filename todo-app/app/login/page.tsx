"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
    //data 
    const router = useRouter ();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData,setFormData] = useState ({
      userName: '', 
      password: '',
    })
    //handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      const {name,value} = e.target;
      setFormData (prev => ({
        ...prev,
        [name] : value
      }));
    };
    //hanlde login
    const handleLogin = async (e: React.FormEvent) =>{
      e.preventDefault();
      setError('');
      setSuccess('');
      try{
        //fetch 
        const res = await fetch ("/api/auth/login" ,{
          method : "POST",
          headers: {'Content-Type' : "application/json"}, 
          body: JSON.stringify(formData),
        });
        const data = await res.json (); 
        if(!res.ok){ 
          throw new Error(data.error || "Login Failed");
        }
            //redict to dashboard
        router.push ("/dashboard")
      }catch{
        setError('Something went wrong. Try again!');
      }
    };


  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white text-black w-[80%] h-[70vh] mx-auto shadow-lg rounded-lg py-24 text-2xl 
                flex md:flex-row flex-col">
        {/* Left Form */}
       <div className="md:w-1/2 w-full p-8">
          <form 
          className="space-y-4 w-full"
          onSubmit={handleLogin}>
            <h1 className="text-5xl font-bold py-4">
              Sign In
            </h1>

            {/* UserName */}
            <input className="w-full px-3 py-5 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6767]"
            name="userName"
            type="text"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter Username"
            /> <br/>
            {/* Password */}
            <input 
            className="w-full px-3 py-5 border border-gray-400 rounded-md focus:ring-2 focus:ring-[#FF6767] focus:outline-none"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            /> <br/>

            <button
              className="border border-gray-400 rounded-md px-16 py-6 mt-6 text-white bg-[#FF6767] 
                        hover:bg-[#ff4d4d] transition-all duration-200"
              type="submit"
            >
              Login
            </button>

            {error && <p className="text-red-600 mb-2">{error}</p>}
            {success && <p className="text-green-600 mb-2">{success}</p>}
            
          </form>
          <p className="mt-8">
              Dont have an account? <Link href={"/register"} className="text-blue-500">Create One</Link>
          </p>
        </div>
         {/* right picture */}
         <div className="flex justify-end items-center flex-none mt-50 ">
            <Image 
              src="/login/Main.png"
              alt="Picture"
              width={600}
              height={200}
              className="object-cover"
            />
          </div>
      </div>

    </div>
  );
}
