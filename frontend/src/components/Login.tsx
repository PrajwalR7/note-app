import axios from 'axios'
import { useRef, MouseEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AUTH_SERVER_URL } from '../consts'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { updateUser } from '../store/user/action'
import { UserType } from '../store/user/reducer'

export default function Login() {
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [authenticated, setAuthenticated] = useState<boolean>(true)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleClick = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        let loginObj: Record<string, unknown> = {
            password: passwordRef.current?.value
        }
        if (nameRef.current?.value.includes('@')) {
            loginObj = {
                ...loginObj,
                email: nameRef.current?.value
            }
        } else {
            loginObj = {
                ...loginObj,
                name: nameRef.current?.value
            }
        }
        try {
            const loginResult = await axios.post(`${AUTH_SERVER_URL}/login`, loginObj)
            const userObj: UserType = {
                name: loginResult.data.name,
                email: loginResult.data.email,
                password: loginResult.data.password,
                _id: loginResult.data._id,
                accessToken: loginResult.data.accessToken
            }
            dispatch(updateUser(userObj))
            navigate('/')
        } catch(e) {
            setAuthenticated(false)            
        }
    }

    return (
        <div className="bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 w-full h-screen flex justify-center items-center">
            <div className="flex flex-col bg-gray-800 shadow-2xl justify-center items-center gap-6 text-[#38BDF8] p-16 w-[30%] rounded-3xl">
                <h3 className="text-3xl font-semibold mb-10">Login</h3>
                <input type="text" ref={nameRef} className="w-full py-3 px-2 bg-transparent placeholder:text-[#38BDF8] ring-2 ring-[#38BDF8] rounded-md" placeholder="Name or Email"/>
                <input type="password" ref={passwordRef} className="w-full py-3 px-2 bg-transparent placeholder:text-[#38BDF8] ring-2 ring-[#38BDF8] rounded-md" placeholder="Password"/>
                <div className='flex flex-row justify-between items-center w-full p-2'>
                    <Link to="/signup"><p className='font-medium underline'>Don't have an account? Signup</p></Link>
                    <button onClick={handleClick} className="px-4 w-20 text-md py-2 rounded-md font-medium bg-[#155E75] text-white">Login</button>
                </div>
                {!authenticated ? <p className='h-4 font-semibold'>Incorrect name/email or password</p> : <p className='h-4'></p>}
            </div>
        </div>
    )
}