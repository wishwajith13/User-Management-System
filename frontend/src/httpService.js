import AppStore from "./AppStore";
import AppActions from "./AppActions";

export const httpService = {
    fetch: async ({ url, options }) => {
        return await fetch(`http://localhost:8080${url}`, options);
    },
    fetchWithAuth: async ({ url, options }) => {
        AppActions.getLocalStorageAuthToken();
        const optionsWithAuth = {
            ...options,
            headers: {
                ...options?.headers,
                Authorization: `Bearer ${AppStore.authToken}`,
            },
        };
        return await fetch(`http://localhost:8080${url}`, optionsWithAuth);
    }
};

export default httpService;
//request back end