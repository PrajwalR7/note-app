import { useRef, MouseEvent, useState, ChangeEvent } from "react"
import { AppDispatch, AppState } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../store/note/action"
import { NoteType } from "../store/note/reducer"
import { UserType } from "../store/user/reducer"
import { StatusType } from "../store/status/reducer"
import { SuccessComponent } from "./status/SuccessComponent"
import { LoadingComponent } from "./status/LoadingComponent"
import { ErrorComponent } from "./status/ErrorComponent"

export const EditPost = ({
    noteObj,
}: {
    noteObj: NoteType
}) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)
    const [isprivate, setIsPrivate] = useState<boolean>(noteObj.private)
    const dispatch = useDispatch<AppDispatch>()

    const userState = useSelector<AppState, UserType>(state => state.user)
    const statusState = useSelector<AppState, StatusType>(state => state.status)

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        if (val === 'Private') {
            setIsPrivate(true)
        } else {
            setIsPrivate(false)
        }
    }
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        console.log('clicked note id', noteObj._id)
        e.preventDefault()
        const postObj: NoteType = {
            _id: noteObj._id,
            title: titleRef.current?.value ?? '',
            description: descRef.current?.value ?? '',
            postedOn: new Date(),
            private: isprivate,
            author: userState.name ?? '',
            authorID: userState._id ?? ''
        }
        dispatch(updatePost(postObj, userState.accessToken ?? ''))
    }

    return (
        <div onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()} className="w-[50%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white bg-black flex p-6 gap-4 flex-col">
        {
            statusState.loading 
            ? <LoadingComponent />
            : statusState.success 
            ? <SuccessComponent />
            : statusState.error ? <ErrorComponent />
            : null
        }
            <h2 className="text-xl mb-4">Edit post</h2>
            <input ref={titleRef} className="placeholder:text-white bg-transparent ring-2 ring-white p-2" type="text" placeholder="Title" defaultValue={noteObj.title}/>
            <textarea ref={descRef} className="placeholder:text-white h-72 bg-transparent ring-2 ring-white p-2" placeholder="Content" defaultValue={noteObj.description}/>
            <div className="flex flex-row gap-4">
                <input onChange={handleRadioChange} checked={isprivate} type="radio" value="Private"/><span>Private</span>
                <input onChange={handleRadioChange} checked={!isprivate} type="radio" value="Public"/><span>Public</span>
            </div>
            <button onClick={handleClick} className="self-end px-4 py-2 rounded-md bg-gray-800">Update</button>
        </div>
    )
}