import * as Dialog from "@radix-ui/react-dialog"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"

import { TNote } from "../types/notes"
import { speechRecognition } from "../utils/speechRecognition"

type BaseNoteProps = {
  children: React.ReactNode
  primary?: boolean
  onClose?: () => void
}

type NoteCardProps = {
  data: TNote
  onNoteDeletion: (noteId: string) => void
}

type NewNoteCardProps = {
  onNoteCreation: (note: TNote) => void
}

const NoteTrigger = ({children, primary = false}: BaseNoteProps) => (
    <Dialog.Trigger className={`
      rounded-md flex flex-col text-left p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-cyan-400
      ${primary ? 'bg-slate-700' : 'bg-slate-800' }
    `}>
      {children}
    </Dialog.Trigger>
)

const NoteContent = ({children, onClose}: BaseNoteProps) => (
  <Dialog.Portal>
      <Dialog.Overlay className="inset-0 fixed bg-black/60">
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close onClick={onClose} className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

            {children}
          
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
)

export const NoteCard = ({data, onNoteDeletion}: NoteCardProps) =>  (
  <Dialog.Root>
    <NoteTrigger>
      <span className="text-sm font-medium text-slate-500">{formatDistanceToNow(data.date, { locale: ptBR, addSuffix: true})}</span>

      <p className="text-sm leading-6 text-slate-400">{data.content}</p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </NoteTrigger>
    <NoteContent>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-sm font-medium text-slate-500">{formatDistanceToNow(data.date, { locale: ptBR, addSuffix: true})}</span>

        <p className="text-sm leading-6 text-slate-400">{data.content}</p>
      </div>

      <button onClick={() => onNoteDeletion(data.id)} className="w-full bg-slate-800 py-4 text-center text-sm-text-slate-300 outline-none font-medium group">
        Deseja <span className="text-red-400 group-hover:underline">apagar essa nota?</span>
      </button>
    </NoteContent>
  </Dialog.Root>
  )

export const NewNoteCard = ({ onNoteCreation }: NewNoteCardProps) => {
  const [isTextArea, setIsTextArea] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')

  const handleStartEditor = () => {
    setIsTextArea(true)
  }
 
  const handleContentChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)

    if(event.target.value === '') {
      setIsTextArea(false)
    }
  }

  const handleSaveNote = (event: FormEvent) => {
    event.preventDefault()

    if(!content) {
      toast.error('A nota não pode estar vazia.')
      return
    }

    onNoteCreation({
      id: crypto.randomUUID(),
      date: new Date(),
      content
    })

    setContent('')
    setIsTextArea(false)

    toast.success('Nota criada com sucesso.')
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setIsTextArea(true)

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true  // Doesn't stop recording when we stop talking
    speechRecognition.maxAlternatives = 1 // Only shows the best alternative it finds for the spoken word
    speechRecognition.interimResults = true // Gives results as we speak

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error('ERROR: ', event)
    }

    speechRecognition.start()
  }

  const handleStopRecording = () => {
    speechRecognition.stop()

    setIsRecording(false)
  }

  return (
    <Dialog.Root>
      <NoteTrigger primary>
        <span className="text-sm font-medium text-slate-500">Adicionar nota</span>

        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será transcrita para texto automaticamente
        </p>
      </NoteTrigger>
      <NoteContent onClose={() => {
        setIsTextArea(false)
        setIsRecording(false)
        setContent('')
      }}>
        <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-500">Adicionar nota</span>

            {isTextArea ? (
              <textarea
                autoFocus
                className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                onChange={handleContentChanged}
                value={content}
              />  
            ): (
              <p className="text-sm leading-6 text-slate-400">
                Comece {' '} 
                <button type="button" onClick={handleStartRecording} className="text-cyan-400 font-medium hover:underline">gravando uma nota</button> 
                {' '} em áudio ou se preferir utilize {' '} 
                <button type="button" onClick={handleStartEditor} className="text-cyan-400 font-medium hover:underline">apenas texto</button>
              </p>
            )}
          </div>

          {isRecording ? (
            <button type="button" onClick={handleStopRecording} className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium group hover:text-slate-100">
              <div className="size-3 rounded-full bg-red-500 animate-pulse" />
              Gravando! (clique p/ interromper)
            </button>
          ) : (
            <button type="button" onClick={handleSaveNote} className="w-full bg-cyan-400 py-4 text-center text-sm text-cyan-950 outline-none font-medium group hover:bg-cyan-500">
              Salvar nota
            </button>
          )}

          
        </form>
      </NoteContent>
    </Dialog.Root>
  )
}