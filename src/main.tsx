import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SignalRProvider } from './SignalRContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SignalRProvider>
  {/* //<React.StrictMode> */}
    <App />
  {/* //</React.StrictMode> */}
  </SignalRProvider>
  ,
)
