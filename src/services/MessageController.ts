import { Message } from "../components/Chat/Message";

interface MessageControllerProps {
    userID: number;
    chatID: number; 
    token: string;
}

interface IMessage {
    chat_id: number
    content: string
    file: any
    id: number
    is_read: boolean
    time: string
    type: string
    user_id: number
}

export class MessageController {
    private socket: WebSocket;
    private userID: number;
    private messageInterval: number;
    constructor({ userID, chatID, token }: MessageControllerProps) {
        this.userID = userID
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userID}/${chatID}/${token}`);
        this.messageInterval = setInterval(() => {
            this.socket.send(JSON.stringify({ type: "ping" }))
        }, 5000)
        this.socket.addEventListener("open", () => this.send);
        this.socket.addEventListener("message", (event) => this.onMessage(event))
        this.socket.addEventListener("close", () => {
            console.log("WS Closed!")
            clearInterval(this.messageInterval)
        })

    }

    send(content: string, type: string) {
        this.socket.send(JSON.stringify({ content, type }));
    }

    close() {
        this.socket.close();
    }

    onMessage(event: MessageEvent) {
        const messages = JSON.parse(event.data);
        if (messages.type === "pong") {
            return;
        }
        if (Array.isArray(messages)) {
            return messages.reverse().forEach((message: IMessage) => {
                this.createElement(message)
            });
        }
        this.createElement(messages)
    }

    createElement(message: IMessage) {
        const messageContainer = document.getElementById("messages");
        
        const messageElem = document.createElement("div");
        messageElem.classList.add("chat-window__messgae");

        if (message.user_id === this.userID) {
            messageElem.setAttribute("dir", "right");
        }

        messageElem.appendChild(document.createTextNode(message.content));
        messageContainer?.appendChild(messageElem);
    }
}
