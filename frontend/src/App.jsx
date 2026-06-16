
import Signup from "./pages/signup";
import Login from "./pages/login";
import {Routes,Route} from "react-router-dom"
import Dashboard from "./pages/dashboard";
export default function App(){

  return(
    
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
  

  )
}