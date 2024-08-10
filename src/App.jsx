import React from 'react'
import Signup from './Pages/Signup'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'

const App = () => {
  return (
    <div className="bg-black h-screen">
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
