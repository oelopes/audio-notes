import { createContext, useContext, useState } from 'react'

import { TNote } from '../types/notes'

type NotesContextType = { 
  notes: TNote[],
  handleNoteCreation: (note: TNote) => void
  handleNoteDeletion: (noteId: string) => void
}

export const NotesContext = createContext({} as NotesContextType)

export function NotesProvider({children}: {children: React.ReactNode}) {
  const [notes, setNotes] = useState<TNote[]>(() => {
    const storageNotes = localStorage.getItem('notes')
    
    if(!storageNotes) {
      return []
    }

    return JSON.parse(storageNotes)
  })

  const handleNoteCreation = (note: TNote) => {
    setNotes((oldState) => {
      const newState = [note, ...oldState]

      localStorage.setItem('notes', JSON.stringify(newState))
      return newState
    })
  }

  const handleNoteDeletion = (noteId: string) => {
    setNotes((oldState) =>  {
      const newState = oldState.filter((note) => note.id !== noteId)

      localStorage.setItem('notes', JSON.stringify(newState))

      return newState
    })    
  }

  return (
    <NotesContext.Provider value={{
      notes, 
      handleNoteCreation,
      handleNoteDeletion
    }}>
      {children}
    </NotesContext.Provider>)
}

export const useNotes = () => {
  const context = useContext(NotesContext)
  return context
}