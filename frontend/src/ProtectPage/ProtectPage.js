import { useEffect, useState } from "react";

export function ProtectPage(){

    const [content,setContent]=useState("")

    useEffect(()=>{
        // httpService.fetchWithAuth({url: '/private'})
        //     .then(response => response.json())
        //     .then(data => {
        //         setContent(data.message)
        //     })
    },[])

    return (
    <div>
        <div>Protected Content: </div>
        <div>The server says: {content}</div>
    </div>
)
}

export default ProtectPage;