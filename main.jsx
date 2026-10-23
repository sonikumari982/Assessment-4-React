import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Queryclient , QueryclientProvider} from "@tanstack/react-query"
const client= new Queryclient()
createRoot(document.getElementById('root')).render(

  <QueryclientProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>,


  </QueryclientProvider>
)
