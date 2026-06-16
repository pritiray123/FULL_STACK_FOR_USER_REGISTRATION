import { useState } from "react";
import { useNavigate} from "react-router-dom";
import './signup.css'
function Signup(){
    const [name,setname] = useState("");
    const [email,setemail]=useState("");
    const [pass, setpass]=useState("");
    const navigate = useNavigate();

    const handlesignup = async(e)=>{
        e.preventDefault()

        const res= await fetch("http://127.0.0.1:8000/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                email:email,
                password:pass
            }),
        });

        const data = await res.json()
        if (res.ok){
            alert(data)
        navigate("/login")
        }
        else{
            alert(
                data.detail
            );
        }
        
    }

    return(
        
        <div className="signup-card">
        <form onSubmit={handlesignup} className="form">
            <input type="text"
            value={name}
            placeholder="name"
            onChange={(e)=>setname(e.target.value)} />

            <input type="email" 
                name="email"
                value={email}
                placeholder="email"
                onChange={(e)=>setemail(e.target.value)} />

            <input
            type="password"
            value={pass}
            placeholder="pass"
            onChange={(e)=>setpass(e.target.value)}/>

            <button>SIGNUP</button>

        </form>
        <div>
            <h1> Have an account?</h1>
            <button onClick={()=>navigate("/login")}>Login</button>
        </div>
        </div>
    )

}
export default Signup