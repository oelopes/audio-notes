import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'

import { NotesProvider } from './contexts/NotesContext.tsx'

import { App } from './app.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotesProvider>
      <App />
      <Toaster richColors />
    </NotesProvider>
  </React.StrictMode>,
)
