// import { Home } from "@mui/icons-material"
import { Routes, Route } from "react-router-dom"
import About from "./Pages/About"
import Home from "./Pages/Home"
import Contact from "./Pages/Contact"
import Books from "./Pages/Books"
import Header from "./components/Header"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import ForgotPassword from "./Pages/ForgotPassword"
import useAuthStore from './stores/authStore';
import { useEffect } from "react"
import BookDetails from "./Pages/BookDetails"

function App() {
  // initialize state
  const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/forgot-password" element={ <ForgotPassword/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="books" element={ <Books/> } />
        <Route path="book/:bookId" element={ <BookDetails/> } />
        <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } />
      </Routes>
    </div>
  )
}

export default App