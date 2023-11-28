import { NoteType } from "../store/note/reducer"

export const NoteCard = ({note}: {note: NoteType}) => {
    console.log(note)
    return (
        <div className='w-[80%] text-white p-6 gap-3 bg-gray-900 flex flex-col rounded-xl'>
            <h4 className='font-semibold text-xl'>{note.title}</h4>
            <hr />
            <p className="truncate">{note.description}</p>
            {!note.private && <p className="self-end">{note.author}</p>}
        </div>
    )
}