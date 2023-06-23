import { HTTPTransport } from "../utils/HTTPTransport";

const API = new HTTPTransport("/api/v2/chats");

// interface UserChatPayload {
//     id: number;
// }

export interface UsersPayload {
    users: number[],
    chatId: number
}

export interface ChatPayload {
    chatId: number
}

export interface CreateChatPayload {
    title: string;
}

class ChatAPI {
    public chats() {
        return API.get("/");
    }
    public token(payload: number) {
        return API.post(`/token/${payload}`)
    }
    public users(payload: UsersPayload) {
        return API.put("/users", { data: payload })
    }
    public chatUsers(query: string) {
        return API.get(`/${query}/users`, {});
    }
    public deleteUsers(payload: UsersPayload) {
        return API.delete("/users", { data: payload });
    }
    public deleteChat(payload: ChatPayload) {
        return API.delete("/", { data: payload });
    }
    public createChat(payload: CreateChatPayload) {
        return API.post("/", { data: payload });
    }
}   

const chatAPI = new ChatAPI();
export default chatAPI
