import authAPI, { LoginBody, RegisterPayload } from "../api/authAPI";
import userAPI, { PasswordBody, ProfileBody, SearchPayload } from "../api/userAPI";
import store from "../utils/Store";

class UserController {
    public async getUser() {
        const data = await authAPI.user().catch(e => e);
        const { response } = data;
        store.set("user", response);
        return response;
    }

    public async register(payload: RegisterPayload) {
        const data = await authAPI.signup(payload).catch(e => e);
        const { response } = data;
        if(response?.reason) {
            return response
        }
        await this.getUser()
        return response;
    }

    public async setUser(payload: LoginBody) {
        const data = await authAPI.login(payload).catch(e => e);
        const { response } = data;
        if (response?.reason) {
            return response
        }
        store.set("user", response);
        return response;
    }

    public logout() {
        authAPI.logout();
        store.set("user", {});
    }

    public async changePassword(payload: PasswordBody) {
        const data = await userAPI.password(payload).catch(e => e);
        const { response } = data;
        return response;

    }

    public async changeProfile(payload: ProfileBody) {
        const data = await userAPI.profile(payload).catch(e => e);
        const { response } = data;
        if (response?.reason) {
            return response
        }
        this.getUser();
        return response;
    }

    public async changeAvatar(payload: FormData) {
        const data = await userAPI.avatar(payload).catch(e => e);
        const { response } = data;
        if(response?.reason || data.status > 200) {
            return data
        }
        store.set("user", response);
        return response
    }

    public async findUser(payload: SearchPayload) {
        const data = await userAPI.search(payload).catch(e => e);
        const { response } = data;
        if (response?.reason || data.status > 200) {
            return data
        }
        return response
    }
}

export default new UserController();
