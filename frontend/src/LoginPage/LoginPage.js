import { useEffect, useState } from "react";

export function LoginPage(){
    const [cognitoUrl,setCognitoUrl] = useState("")

    useEffect(()=>{
        // httpService.fetch({url: '/auth/url'})
        //     .then(response => response.json())
        //     .then(data => {
        //         setCognitoUrl(data.url)
        //     })
    },[])
    return (
        <div>
            <button onClick={() => {window.location.href = cognitoUrl}}>Sign in with Google</button>
        </div>
    )
}

export default LoginPage;