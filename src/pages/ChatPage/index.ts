import Block from "../../utils/Block";
import template from "./chatPage.hbs";

import { Chat } from "../../components/Chat/ChatContainer";
import { chat, Sidebar } from "../../components/Sidebar";
import { withRouter } from "../../HOC/withRoutes";
import isEqual from "../../utils/isEqual";
import ChatController from "../../services/ChatController";
import userController from "../../services/userController";
import { MessageController } from "../../services/MessageController";
import { DropdownModal } from "../../components/Chat/Modal";

export type Modal = {
    type: string,
    show: boolean
}

class ChatPageBase extends Block {
    public messageController: MessageController | null;
    constructor() {
        super({});
        this.messageController = null
    }
    async setChatId(chat: chat) {
        if(this.props.chat) {
            if(this.props.chat.id !== chat.id) {
                this.messageController?.close();
            }
        }
        const data = await ChatController
            .getChatToken(chat.id)
            .catch((e) => {
                return e
            });
        const user = await userController
            .getUser()
            .catch((e) => {
                return e
            });
        if(data.token || user.id) {
            this.messageController = new MessageController({
                chatID: chat.id,
                userID: user.id,
                token: data.token
            })
            this.setProps({chat});
        }
    }

    setModal(modal: Modal) {
        this.setProps({modal})
    }

    async getChats() {
        const chats = await ChatController
            .getChats()
            .catch((e) => {
                return e
            });
        if(chats.response?.reason || chats?.status === 500) {
            return;
        }
        this.setProps({ chats });

    }

    async componentDidMount(): Promise<void> {
        this.getChats();
    }


    async userEvent(login: string) {
        return await userController
            .findUser({ login })
            .catch((e) => {
                return e
            })
    }

    async deleteChat() {
        const chat = await ChatController.deleteChat({
            chatId: this.props.chat.id
        }).catch(e => e) 
        this.messageController?.close();
        this.getChats();
        this.setProps({
            chat: null
        })
        delete this.children.chatContainer;
        return chat
    }

    async getUsers() {
        return await ChatController
            .getChatUsers(this.props.chat.id)
            .catch(e => e);
    }

    async createChat(title: string) {
        const chat = await ChatController
            .createChat({ title })
            .catch(e => e);
        this.getChats();
        return chat;
    }

    showModal() {
        if(!this.props.modal) {
            return;
        }
        switch (this.props.modal.type) {
            case "add":
                this.children.modal = new DropdownModal({
                    show: this.props.modal.show,
                    type: "add",
                    text: "Добавить пользователя",
                    chatID: this.props.chat.id,
                    userEvent: this.userEvent,
                    setModal: this.setModal.bind(this)
                })
                break;
            case "delete":
                this.children.modal = new DropdownModal({
                    show: this.props.modal.show,
                    type: "delete",
                    text: "Удалить пользователя",
                    chatID: this.props.chat.id,
                    userEvent: this.getUsers.bind(this),
                    setModal: this.setModal.bind(this),

                })
                break;
            case "сreate":
                this.children.modal = new DropdownModal({
                    show: this.props.modal.show,
                    type: "create",
                    text: "Создать чат",
                    userEvent: this.createChat.bind(this),
                    setModal: this.setModal.bind(this),
                })
                break;
            default:
                break;
        }
    }

    chat() {
        if(this.props.chat) {
            this.children.chatContainer = new Chat({
                chat: this.props.chat,
                deleteChat: this.deleteChat.bind(this),
                setModal: this.setModal.bind(this),
                messageController: this.messageController
            });
        }
    }

    sidebar() {
        this.children.sidebar = new Sidebar({
            setChatProps: this.setChatId.bind(this),
            setModal: this.setModal.bind(this),
            chats: this.props.chats
        });
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        return !isEqual(oldProps, newProps)
    }

    protected render(): DocumentFragment {
        this.chat();
        this.sidebar();
        this.showModal();
        return this.compile(template, this.props)
    }
}

export const ChatPage = withRouter(ChatPageBase);
