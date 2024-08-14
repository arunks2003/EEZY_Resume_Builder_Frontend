import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/ui/custom/Header'
import { Toaster } from "@/components/ui/toaster"

function App() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0)
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return navigate('/auth/sign-in')
  }

  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Toaster />
    </>
  )
}

export default App
