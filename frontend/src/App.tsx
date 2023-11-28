import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from './store/note/action'
import { AppDispatch, AppState } from './store'
import { UserType } from './store/user/reducer'
import { NoteType } from './store/note/reducer'
import { useNavigate } from 'react-router-dom'
import { NoteCard } from './components/NoteCard'
import { EmptyNoteCard } from './components/EmptyNoteCard'

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const userState = useSelector<AppState, UserType>(state => state.user)
  const noteState = useSelector<AppState, NoteType[]>(state => state.note)
  const publicNote = noteState?.filter(note => !note.private) ?? []
  const userNote = noteState?.filter(note => note._id === userState._id) ?? []
  const navigate = useNavigate()

  useEffect(() => {
    if (!userState.accessToken) {
      navigate('/login')
    } 
  })

  useEffect(() => {
    dispatch(fetchPosts(userState.accessToken ?? ''))
  }, [])

  return (
    <div className="w-full h-screen bg-gray-800 items-center p-12 text-white flex flex-col gap-4">
      <div className='w-[70%] p-12 flex gap-4 flex-col'>
        <h2 className='text-2xl'>Your notes</h2>
        {
          noteState && userNote.length !== 0 ? userNote.map(note => {
            return (
              <NoteCard note={note} />
            )
          })
          : <div className='w-full text-white p-4 flex justify-center items-center'>
            <p>No notes available</p>
          </div>
        }
      </div>
      <div className='w-[70%] p-12 gap-4 flex flex-col'>
        <h2 className='text-2xl'>Public notes</h2>
        {
          noteState && publicNote.length !== 0 ? publicNote.map(note => {
            return (
              <NoteCard note={note} />
            )
          })
          : <EmptyNoteCard />
        }
      </div>
    </div>
  )
}