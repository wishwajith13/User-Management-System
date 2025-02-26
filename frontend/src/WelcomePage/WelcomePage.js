import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function WelcomePage(){

    const navigate=useNavigate()
    const [content,setContent] = useState("")

    useEffect(()=>{
        // httpService.fetch({url:'/public'})
        //     .then(response => response.json())
        //     .then(data => {
        //         setContent(data.message)
        //     })
    },[])

    return (
    <div>
        <button className="users-button" onClick={()=> navigate('/login')}>Login</button>
        <button className="users-button" onClick={()=> navigate('/private')}>Private Content</button>
        <div>By the way, the servers says: {content}</div>
    </div>
    )
}

export default WelcomePage;