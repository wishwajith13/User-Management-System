import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AppActions from "../AppActions";
import httpService from "../httpService";

export function RedirectPage() {

    const [showSpinner, setShowSpinner] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        httpService.fetch({url: `/auth/callback?code=${code}`})
            .then(response => response.json())
            .then(data => {
                setShowSpinner(false);
                AppActions.setAuthToken(data.token);
                navigate('/private', { replace: true })
        });
    }, []);

    return (
        <div>
           Trying to log in......... 
        </div>
    );

};

export default RedirectPage;