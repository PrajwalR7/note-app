import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from './store/note/action'
import { AppDispatch, AppState } from './store'
import { UserType } from './store/user/reducer'
import { NoteType } from './store/note/reducer'
import { useNavigate } from 'react-router-dom'

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const userState = useSelector<AppState, UserType>(state => state.user)
  const noteState = useSelector<AppState, NoteType[]>(state => state.note)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(userState.accessToken)
    if (!userState.accessToken) {
      navigate('/login')
    } 
  })

  useEffect(() => {
    dispatch(fetchPosts(userState.accessToken ?? ''))
  }, [])

  return (
    <div>
      hello world
    </div>
  )
}