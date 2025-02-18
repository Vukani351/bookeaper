// import { Home } from "@mui/icons-material"
import { Routes, Route, Navigate } from "react-router-dom"
import About from "./Pages/About"
import Home from "./Pages/Home"
import Contact from "./Pages/Contact"
import Books from "./Pages/Books"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import ForgotPassword from "./Pages/ForgotPassword"
import useAuthStore from './stores/authStore';
import BookDetails from "./Pages/BookDetails"
import AddBook from "./Pages/AddBook"
import Profile from "./Pages/Profile"
import LibrarySettings from "./Pages/library/LibrarySettings"

function App() {
  // initialize state
  const { user } = useAuthStore();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="login" element={ !!user ? <Navigate to="/library" replace /> : <Login/> } />
        <Route path="forgot-password" element={ <ForgotPassword/> } />
        <Route path="register" element={ <Register/> } />
        <Route path="library" element={ <Books/> } />
        <Route path="profile" element={ <Profile/> } />
        <Route path="library/settings/:id" element={ <LibrarySettings/> } />
        <Route path="add-book" element={ <AddBook/> } />
        <Route path="book/:bookId" element={ <BookDetails/> } />
        <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } />
      </Routes>
    </div>
  )
}

export default App