import axios, { AxiosError } from 'axios'
import { MouseEvent, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AUTH_SERVER_URL } from '../consts'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { insertUser } from '../store/user/action'

export default function Signup() {
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [userAlreadyPresent, setUserAlreadyPresent] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleClick = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const userObj = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        }
        try {
            const response = await axios.post(`${AUTH_SERVER_URL}/signup`, userObj)
            dispatch(insertUser(response.data))
            navigate('/login')
        } catch(e) {
            if((e as AxiosError).response?.status === 400) {
                setUserAlreadyPresent(true)
            }
        }
    }

    return (
        <div className="bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 w-full h-screen flex justify-center items-center">
            <div className="flex flex-col bg-gray-800 shadow-2xl justify-center items-center gap-6 text-[#38BDF8] p-16 w-[30%] rounded-3xl">
                <h3 className="text-3xl font-semibold mb-10">Sign up</h3>
                <input type="text" ref={nameRef} className="w-full py-3 px-2 bg-transparent placeholder:text-[#38BDF8] ring-2 ring-[#38BDF8] rounded-md" placeholder="Name"/>
                <input type="email" ref={emailRef} className="w-full py-3 px-2 bg-transparent placeholder:text-[#38BDF8] ring-2 ring-[#38BDF8] rounded-md" placeholder="Email"/>
                <input type="password" ref={passwordRef} className="w-full py-3 px-2 bg-transparent placeholder:text-[#38BDF8] ring-2 ring-[#38BDF8] rounded-md" placeholder="Password"/>
                <div className='flex flex-row justify-between items-center w-full p-2'>
                    <Link to="/login"><p className='font-medium underline'>Already have an account? Login</p></Link>
                    <button onClick={handleClick} className="px-4 w-20 text-md py-2 rounded-md font-medium bg-[#155E75] text-white">Signup</button>
                </div>
                {userAlreadyPresent ? <p className='h-4 font-semibold'>User is already present try logging in</p> : <p className='h-4'></p>}
            </div>
        </div>
    )
}