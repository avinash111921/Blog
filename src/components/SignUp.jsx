import React,{useState} from 'react'
import authService from "../appwrite/auth.js"
import {Link,useNavigate} from 'react-router-dom'
import { login } from '../store/authSlice.js'
// import {Button,Input,Logo} from './index.js'
import Button from "../components/Button.jsx"
import Input from "../components/Input.jsx"
import Logo from "../components/Logo.jsx"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

const SignUp = () => {
    const navigate = useNavigate();
    const [error,setError] = useState('');
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const create = async(data) => {
        setError("")
        try {
            const userData  = await authService.createAccount(data);
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData) {
                    dispatch(login(userData));
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
            Sign Up to create account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Already have an account?&nbsp; 
            <Link 
            to='/login'
            className='font-medium text-primary transition-all duration-200 hover:underline'
            >
                Sign In
            </Link>
        </p>
        {error && <p className='mt-8 text-center text-base text-red-600'>{error}</p>}
        <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5'>
                <Input
                label='Full Name:'
                placeholder='Enter your full name'
                type='text'
                {...register('name',{
                    required:true
                })}
                />
                <Input 
                label="Email:"
                placeholder="Enter your Email" 
                type="email" 
                {...register("email",{
                    required: true,
                    validate : {
                        matchPattern: (value) => /^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/.test(value) || "Invalid Email address"
                    }
                })}
                />
                <Input
                type='password'
                label='Password'
                placeholder='Enter your password'
                {...register('password',{
                    required:true,
                    minLength:8,
                    maxLength:50
                })}
                />
                <Button type='submit' className='w-full'>Create Account</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default SignUp
