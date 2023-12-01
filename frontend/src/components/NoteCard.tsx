import { useState, MouseEvent, SetStateAction } from "react";
import { NoteType } from "../store/note/reducer"
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";
import { createPortal } from "react-dom";
import { EditPost } from "./EditPost";
import { deletPost } from "../store/note/action";
import { UserType } from "../store/user/reducer";

export const NoteCard = ({note, isPublic, editPostModalShow, seteditPostModalShow}: {note: NoteType, isPublic: boolean, editPostModalShow?: boolean, seteditPostModalShow?: React.Dispatch<SetStateAction<boolean>>}) => {
    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector<AppState, UserType>(state => state.user)
    const editHandler = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (seteditPostModalShow)
        seteditPostModalShow(true)
    }

    const deleteHandler = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault()
        e.stopPropagation()

        dispatch(deletPost(note._id ?? '', userState.accessToken ?? ''))
    }

    return (
        <>
            {editPostModalShow && createPortal(<EditPost noteObj={note}/>, document.getElementById('new-post-modal') as HTMLElement)}
            <div className='w-[80%] text-white p-6 gap-3 bg-gray-900 flex flex-col rounded-xl'>
                <div className="flex flex-row justify-between">
                    <h4 className='font-semibold text-xl truncate'>{note.title}</h4>
                    {!isPublic && <div className="flex flex-row gap-2">
                        <span onClick={editHandler}><MdEdit style={{width: '17px', height: '17px'}} /></span>
                        <span onClick={deleteHandler}><MdDelete style={{width: '17px', height: '17px'}} /></span>
                    </div>}
                </div>
                <hr />
                <p className="truncate">{note.description}</p>
                {isPublic && <p className="self-end">{note.author}</p>}
            </div>
        </>
    )
}