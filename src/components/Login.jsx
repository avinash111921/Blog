import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice.js'
// import {Button,Input,Logo} from './index.js'
import Button from "../components/Button.jsx"
import Input from "../components/Input.jsx"
import Logo from "../components/Logo.jsx"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth.js'
import { useForm } from 'react-hook-form'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit} = useForm();
    const [error, setError] = useState("");
    /*form ko kaise handle karna hai handle submit like*/
    const Login = async(data) => {
        setError("");
        try{
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData){
                    dispatch(authLogin({userData}));
                    navigate("/");
                }
            }
        }catch(error){
            setError(error.message);
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
            Sign in to your account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Don&apos;t have an account?&nbsp; 
            <Link 
            to="/signup" 
            className='font-medium text-primary transition-all duration-200 hover:underline'>
                Sign up
            </Link>
        </p>
        {error && <p className='text-center text-red-600 mt-8'>
            {error}</p>
        }
        {/* handleSubmit ek react hook form ka method ,( ek method hai) jisko hum method dete hai jo form ko handle karega */}
        <form onSubmit={handleSubmit(Login)} className='mt-8'> 
            <div className='space-y-5'>
                <Input 
                    label="Email:"
                    placeholder="Enter your Email" 
                    type="email" 
                    {...register("email",{ /* always spread register  "email" is a name*/
                        required: true,
                        validate : {
                            matchPattern: (value) => /^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/.test(value) || "Invalid Email address"
                        }
                    })}
                />  
                <Input 
                    label="Password: "
                    type="password" 
                    placeholder="Enter your password" 
                    {...register("password",{   
                        required: true,
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long"
                        }
                    })} 
                />
                <Button 
                type="submit"
                className='w-full'
                >Sign In
                </Button>
            </div>   
        </form> 
      </div>
    </div>
  )
}

export default Login
