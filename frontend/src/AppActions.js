import { action } from "mobx";
import AppStore from "./AppStore";

export const AppActions = {
    setAuthToken: action((token) => {
        AppStore.authToken = token;
        localStorage.setItem("token", token);
    }),
    getLocalStorageAuthToken: action(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            return false;
        }
        AppActions.setAuthToken(token);
        return true;
    }),
};

export default AppActions;
//manage the store 