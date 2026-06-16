import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import profilePic from "./145856997_296fe121-5dfa-43f4-98b5-db50019738a7.jpg";
export default  function Dashboard(){
    const [user,setUser]=useState({name:"",email:""})
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchuserdata=async()=>{
            const token = localStorage.getItem("token")

            if (!token){
                alert("login"),
                navigate("/login")
                return;
            }

            try{
                const res= await fetch("http://127.0.0.1:8000/dashboard",{
                     method:"GET",
                        headers:{
                            "Authorization":`Bearer ${token}`,
                            "Content-Type":"application/json"
                        }
                    })
                    const data = await res.json();
                    if (res.ok){
                        setUser(data)
                    }else{
                        alert(data.detail),
                        navigate("/login")
                    }

                }catch(error){
                        console.error("user fetching dashboard",error)
                }
            
        }
        fetchuserdata()        
    },[navigate]);

    return(
        <div className="dashboard-container">
            <div className="account-card">
                <h2 className="card-title">Account Settings</h2>
                <hr className="divider" />
                
                <div className="profile-section">
                    <div className="avatar-wrapper">
                        <img
                            src={profilePic}
                            alt="Profile" 
                            className="profile-img"
                        />
                        <button className="camera-btn">📷</button>
                    </div>
                    
                    <div className="user-details">
                        <h3 className="user-name">{user.name}</h3>
                        <p className="user-email">{user.email}</p>
                    </div>
                </div>

                <p className="bio-text">
                    Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, 
                    Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore 
                    Magna Aliquyam Erat, Sed Diam
                </p>
                
                <button className="logout-btn" onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                }}>Logout</button>
            </div>
        </div>
    )
    
}