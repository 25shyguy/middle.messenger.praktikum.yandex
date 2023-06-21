import { HTTPTransport } from "../utils/HTTPTransport";

const API = new HTTPTransport("/api/v2/user");

export interface PasswordBody {
    oldPassword: string;
    newPassword: string;
}

export interface ProfileBody {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export interface SearchPayload {
    login: string
}

export interface AvatarPayload {
    avatar: string
}

class UserAPI {
    public password(payload: PasswordBody) {
        return API.put("/password", { data: payload });
    }
    
    public profile(payload: ProfileBody) {
        return API.put("/profile", { data: payload });
    }
    
    public avatar(payload: FormData) {
        return API.put("/profile/avatar", { data: payload, contentType: "multipart/form-data" });
    }
    public search(payload: SearchPayload) {
        return API.post("/search", { data: payload})
    }
    

}

const userAPI = new UserAPI();
export default userAPI
