import { HTTPTransport } from "../utils/HTTPTransport";

const API = new HTTPTransport("/api/v2/auth");

export interface RegisterPayload {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    phone: string,
    password: string,
}

export interface LoginBody {
    login: string,
    password: string,
}

class AuthAPI {
    public login(payload: LoginBody) {
        return API.post("/signin", { data: payload})
    }

    public user() {
        return API.get("/user", {})

    }

    public logout() {
        return API.post("/logout", {})
    }

    public signup(payload: RegisterPayload) {
        return API.post("/signup", { data: payload});
    }
}

const authAPI = new AuthAPI();
export default authAPI
