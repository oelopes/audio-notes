import { ChangeEvent, useState } from "react"
import { NewNoteCard, NoteCard } from "./components/note-card"

import { useNotes } from "./contexts/NotesContext"

export const App = () => {
  const {notes, handleNoteCreation, handleNoteDeletion} = useNotes()

  const [search, setSearch] = useState('')

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes = notes.filter((note) => note.content.toLowerCase().includes(search.toLowerCase()))
  

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <form className="w-full">
        <input 
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500" 
          type="text" 
          placeholder="Busque em suas notas..." 
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreation={handleNoteCreation}/>

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} data={note} onNoteDeletion={handleNoteDeletion} />
        ))}
      </div>
    </div>
  )
}
