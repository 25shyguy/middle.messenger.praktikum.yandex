import userAPI from "../api/userAPI";
import { AppState } from "../store";
import store, { Dispatch } from "../utils/Store";

type LoginPayload = {
    login: string;
    password: string;
}

class UserController {
    // static getUser() {
    //     throw new Error("Method not implemented.");
    // }
    public async getUser() {
        const data = await userAPI.user();
        const { response } = data;
        const oldState = { ...store.getState() };
        store.set("user", response);
    }

    public async setUser(payload: LoginPayload) {
        const data = await userAPI.login(payload);
        const { response } = data;
        store.set("user", response);
    }

    public logout() {
        userAPI.logout();
    }
}

export default new UserController();

// export const UserController = async (
//     state: AppState,
//     action: LoginPayload
// ) => {
//     const response = await userAPI.login(action);
//     console.log(response);
//     const responseUser =
//     console.log(responseUser);
// }
