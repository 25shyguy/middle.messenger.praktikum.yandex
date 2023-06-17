import { HTTPTransport } from "../utils/HTTPTransport";

const API = new HTTPTransport("/api/v2/auth");

type UserData = {
    id: string,
    first_name: string,
    second_name: string,
    display_name: string | null,
    login: string,
    email: string,
    phone: string,
    avatar: string | null
}

interface RegisterPayload {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    phone: string,
    password: string,
}

interface LoginBody {
    login: string,
    password: string,
}

class UserAPI {
    public login(payload: LoginBody) {
        return API.post("/signin", payload)
    }

    public user() {
        return API.get("/user", {})

    }

    public logout() {
        return API.post("/logout", {})
    }

    public signup(payload: RegisterPayload) {
        return API.post("/signup", payload);
    }
}

const userAPI = new UserAPI();
export default userAPI
