import React,{useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
},ref){
    const id = useId();
    return (
        <div className='w-full'>
            {
            label &&
             <label className='inline-block mb-1 pl-1' htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`w-full px-3 py-2 border bg-white text-black outline-none focus:bg-gray-50 duration-200  border-gray-200  rounded-lg ${className}`}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    )
})

export default Input
/* froward ref -> state managment ke liye */