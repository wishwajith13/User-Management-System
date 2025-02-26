import { observable } from "mobx";

export const AppStore = observable({
    authToken: null,
});

export default AppStore;
//store the token 