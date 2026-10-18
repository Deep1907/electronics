import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import VerifyForgotPasswordOtp from './pages/VerifyForgotPasswordOtp.jsx'
import ConfirmPassword from "./pages/ConfirmPassword.jsx"
import Navbar from './component/Navbar.jsx'
import { UserProvider } from './component/UserContext.jsx'
import ProtectedRoute from './component/ProtectedRoute.jsx'
import CartPage from "./pages/CartPage.jsx"

export const backendURL = "https://electronics-oman.onrender.com/"

function App() {

  return (
    <>
    <UserProvider>
      <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/signup" element={<Signup />}  />
              <Route path="/login" element={<Login />}  />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/verifyotp" element={<VerifyOtp />} />
              <Route path="/verifyforgotpasswordotp" element={
                <ProtectedRoute>
                  <VerifyForgotPasswordOtp />
                </ProtectedRoute>
              } />
              <Route path="/confirmpassword" element={
                <ProtectedRoute>
                  <ConfirmPassword />
                </ProtectedRoute>
              } />

              <Route path="/cartpage" element={<CartPage />} />
          </Routes>
      </BrowserRouter>
    </UserProvider>  
    </>
  )
}

export default App
