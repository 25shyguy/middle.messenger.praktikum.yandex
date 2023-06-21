import Block from "../../../utils/Block";
import template from "./chat.hbs";

import { ChatHeader } from "../ChatHeader";
import { ChatWindow } from "../ChatWindow";
import { ChatForm } from "../ChatForm";
import { chat } from "../../Sidebar";
import { MessageController } from "../../../services/MessageController";
import { Modal } from "../../../pages/ChatPage";


interface ChatProps {
    chat: chat,
    token?: string,
    userID?: number,
    messageController: MessageController | null,
    setModal: (modal: Modal) => void;
    deleteChat: () => void;
}

export class Chat extends Block {
    constructor(props: ChatProps) {
        super(props);
    }

    async send(content: string, type = "message") {
        this.props.messageController.send(content, type);
    }

    protected init(): void {
        this.children.chatHeader = new ChatHeader({
            name: this.props.chat.title,
            img: this.props.chat.avatar,
            setModal: this.props.setModal,
            deleteChat: this.props.deleteChat
        });
        this.children.chatWindow = new ChatWindow({
            messageController: this.props.messageController
        });
        this.children.chatForm = new ChatForm({
            messageController: this.props.messageController
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
