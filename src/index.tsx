import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, NotFound } from './pages'
import { FxChainProvider, SourceProvider } from 'src/context'
import './modules/input-knobs'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '*', element: <NotFound /> },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <SourceProvider>
    <FxChainProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </FxChainProvider>
  </SourceProvider>,
)
