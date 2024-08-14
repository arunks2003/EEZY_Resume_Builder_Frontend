import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeid]/edit/index.jsx'
import ViewResume from './resumes/[resumeId]/view/ViewResume.jsx'
import DownloadResume from './resumes/[resumeId]/view/DownloadResume.jsx'

// Import your publishable key for clerk integration
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


const router = createBrowserRouter([
  {
    element: <App></App>,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume />
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume></EditResume>
      }
    ]
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage></SignInPage>
  },
  {
    path: '/',
    element: <Home></Home>
  },
  {
    path: '/resumes/:resumeId/view',
    element: <ViewResume></ViewResume>
  },
  {
    path: '/resumes/:resumeId/download',
    element: <DownloadResume></DownloadResume>
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)
