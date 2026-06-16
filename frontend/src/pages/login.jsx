import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login(){
    const [email,setemail]=useState("");
    const [pass , setpass] = useState("");
    const navigate=useNavigate();

    const handlelogin=async (e)=>{
        e.preventDefault()
        
        const res=await fetch("https://full-stack-for-user-registration.onrender.com/login",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    password:pass
                }),
            }
        )
        const data=await res.json()
        if(res.ok){
        localStorage.setItem("token",data.access_token)
        alert(data.message)
        navigate("/Dashboard")
    }else{
        alert(data.detail
        );
        navigate("/signup")
    }

    }

    return(
        <div className="login-card">
        <form onSubmit={handlelogin} className="form">
            <input type="email" 
                    value={email}
                    placeholder="email"
                    onChange={(e)=>setemail(e.target.value)}/>
            <input
                type="pass"
                value={pass}
                placeholder="password"
                onChange={(e)=>setpass(e.target.value)}
            />

            <button>Login</button>
        </form>
        </div>
    )
}