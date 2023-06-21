import chatAPI, { ChatPayload, CreateChatPayload, UsersPayload } from "../api/chatAPI";

class ChatController {
    public async getChats() {
        const data = await chatAPI.chats();
        const { response } = data;
        if (response?.reason || data.status === 500) {
            return data
        }
        return response;
    }

    public async getChatToken(token: number) {
        const data = await chatAPI.token(token);
        const { response } = data;
        if (response?.reason || data.status === 500) {
            return data
        }
        return response;
    }

    public async addUsers(payload: UsersPayload) {
        const data = await chatAPI.users(payload);
        const { response } = data;
        if (response?.reason || data.status === 500) {
            return data
        }
        return response;
    }

    public async getChatUsers(payload: string) {
        const data = await chatAPI.chatUsers(payload);
        const { response } = data;
        if (response?.reason || data.status === 500) {
            return data
        }
        return response;
    }

    public async deleteChatUsers(payload: UsersPayload) {
        const data = await chatAPI.deleteUsers(payload);
        const { response } = data;
        if (response?.reason || data.status === 500) {
            return data
        }
        return response;
    }

    public async deleteChat(payload: ChatPayload) {
        const data = await chatAPI.deleteChat(payload);
        const { response } = data;
        if (response?.reason || data.status === 500) {
            return data
        }
        return response;
    }

    public async createChat(payload: CreateChatPayload) {
        const data = await chatAPI.createChat(payload);
        const { response } = data;
        if (response?.reason || data.status === 500) {
            return data
        }
        return response;
    }
}

export default new ChatController();
