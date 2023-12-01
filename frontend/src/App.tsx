import { useEffect, useState, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from './store/note/action'
import { AppDispatch, AppState } from './store'
import { UserType } from './store/user/reducer'
import { NoteType } from './store/note/reducer'
import { useNavigate } from 'react-router-dom'
import { NoteCard } from './components/NoteCard'
import { EmptyNoteCard } from './components/EmptyNoteCard'
import { createPortal } from 'react-dom'
import { NewPost } from './components/NewPost'
import { FaPlus } from "react-icons/fa";
import { resetStatus } from './store/status/action'
import { StatusType } from './store/status/reducer'
import { TOKEN_EXPIRED_ERROR } from './consts'

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const userState = useSelector<AppState, UserType>(state => state.user)
  const noteState = useSelector<AppState, NoteType[]>(state => state.note)
  const statusState = useSelector<AppState, StatusType>(state => state.status)
  const publicNote = noteState?.filter(note => !note.private) ?? []
  const userNote = noteState?.filter(note => note.authorID === userState._id) ?? []
  console.log('TOTAL STATE - ', noteState)
  console.log(userNote)
  const [newPostModalShow, setnewPostModalShow] = useState<boolean>(false)
  const [editPostModalShow, seteditPostModalShow] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleNewPostClick = (e: MouseEvent<HTMLParagraphElement>) => {
    dispatch(resetStatus())
    e.preventDefault()
    e.stopPropagation()
    setnewPostModalShow(true)
  }

  useEffect(() => {
    if (!userState.accessToken || statusState.error === TOKEN_EXPIRED_ERROR) {
        navigate('/login')
    }
  }, [])

  useEffect(() => {
    addEventListener('click', () => {
      setnewPostModalShow(false)
      seteditPostModalShow(false)
    })

    dispatch(fetchPosts(userState.accessToken ?? ''))

    return () => {
      removeEventListener('click', () => {
      seteditPostModalShow(false)
      setnewPostModalShow(false)
      })
    }
  }, [])

  return (
    <>
      {newPostModalShow && createPortal(<NewPost />, document.getElementById('new-post-modal') as Element)}
      <div className="w-full min-h-screen bg-gray-800 items-center p-12 text-white flex flex-col gap-4">
        <div className='w-[70%] p-12 flex gap-4 flex-col'>
          <h2 className='text-2xl'>Your notes</h2>
          {
            noteState && userNote.length !== 0 ? userNote.map(note => {
              return (
                <NoteCard note={note} isPublic={false} editPostModalShow={editPostModalShow} seteditPostModalShow={seteditPostModalShow} />
              )
            })
            : <EmptyNoteCard />
          }
        </div>
        <div className='w-[70%] p-12 gap-4 flex flex-col'>
          <h2 className='text-2xl'>Public notes</h2>
          {
            noteState && publicNote.length !== 0 ? publicNote.map(note => {
              return (
                <NoteCard note={note} isPublic={true} />
              )
            })
            : <EmptyNoteCard />
          }
        </div>
      </div>
      <p onClick={handleNewPostClick} className='px-5 py-3 flex flex-row items-center gap-2 fixed bottom-2 right-2 rounded-full bg-gray-900 text-white'><FaPlus /> New Post</p>
    </>
  )
}