import './App.css'
import AdminLogin from './components/AdminLogin.jsx'
import AdminHome from './pages/adminHome.jsx'

export const backendURL = "https://electronics-oman.onrender.com/"

import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    <>
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/adminlogin" element={<AdminLogin />} />
                  <Route path="/adminhome" element={<AdminHome />} />
              </Routes>
          </BrowserRouter> 
      </div>
    </>
  )
}

export default App
