import * as Dialog from "@radix-ui/react-dialog"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { X } from "lucide-react"

type BaseNoteProps = {
  children: React.ReactNode
  primary?: boolean
}

type NoteCardProps = {
  date: Date
  content: string
}

const NoteTrigger = ({children, primary = false}: BaseNoteProps) => (
    <Dialog.Trigger className={`
      rounded-md flex flex-col text-left p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-cyan-400
      ${primary ? 'bg-slate-700' : 'bg-slate-800' }
    `}>
      {children}
    </Dialog.Trigger>
)

const NoteContent = ({children}: BaseNoteProps) => (
  <Dialog.Portal>
      <Dialog.Overlay className="inset-0 fixed bg-black/60">
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

            {children}
          
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
)

export const NoteCard = ({date, content}: NoteCardProps) =>  (
  <Dialog.Root>
    <NoteTrigger>
      <span className="text-sm font-medium text-slate-500">{formatDistanceToNow(date, { locale: ptBR, addSuffix: true})}</span>

      <p className="text-sm leading-6 text-slate-400">{content}</p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </NoteTrigger>
    <NoteContent>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-sm font-medium text-slate-500">{formatDistanceToNow(date, { locale: ptBR, addSuffix: true})}</span>

        <p className="text-sm leading-6 text-slate-400">{content}</p>
      </div>

      <button className="w-full bg-slate-800 py-4 text-center text-sm-text-slate-300 outline-none font-medium group">
        Deseja <span className="text-red-400 group-hover:underline">apagar essa nota?</span>
      </button>
    </NoteContent>
  </Dialog.Root>
  )

export const NewNoteCard = () => {
  return (
    <Dialog.Root>
      <NoteTrigger primary>
        <span className="text-sm font-medium text-slate-500">Adicionar nota</span>

        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será transcrita para texto automaticamente
        </p>
      </NoteTrigger>
      <NoteContent>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="text-sm font-medium text-slate-500">Adicionar nota</span>

          <p className="text-sm leading-6 text-slate-400">
            Comece <button className="text-cyan-400 font-medium hover:underline">gravando uma nota</button> em áudio ou se preferir utilize <button className="text-cyan-400 font-medium hover:underline">apenas texto</button>
          </p>
        </div>

        <button className="w-full bg-cyan-400 py-4 text-center text-sm text-cyan-950 outline-none font-medium group hover:bg-cyan-500">
          Salvar nota
        </button>
      </NoteContent>
    </Dialog.Root>
  )
}