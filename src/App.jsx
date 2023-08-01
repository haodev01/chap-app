
import './App.css'
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/Login/index.jsx";
import HomePage from "./pages/Home/index.jsx";
import RegisterPage from "./pages/Register/index.jsx";
import Profile from "./pages/Profile/index.jsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </>
  )
}

export default App
