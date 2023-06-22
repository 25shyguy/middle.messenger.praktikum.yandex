import Block from "../../utils/Block";
import template from "./sidebar.hbs";

import { Input } from "../Input";
import { UserChats } from "./components/User";
import ChatController from "../../services/ChatController";
import { withRouter } from "../../HOC/withRoutes";
import isEqual from "../../utils/isEqual";
import { Button } from "../Button";
import { Modal } from "../../pages/ChatPage";
import noAvatar from "../../images/no-image.svg";

type LastMssage = {
    content:string
    id:number
    time:string
}

export type chat = {
    id: number,
    title: string,
    avatar: string | null,
    created_by: number,
    unread_count: number,
    last_message: LastMssage
}

interface SidebarProps {
    chats?: chat[];
    setChatProps: (props: any) => void;
    setModal: (modal: Modal) => void;
}

const avatarURL = "https ://ya-praktikum.tech/api/v2/resources"

class SidebarBase extends Block {
    constructor(props: Partial<SidebarProps>) {
        super(props)
    }

    protected init(): void {
        this.children.createButton = new Button({
            className: "button-submit",
            type: "button",
            text: "Новый чат +",
            events: {
                click: () => {
                    this.props.setModal({
                        type: "сreate",
                        show: true
                    })
                }
            }
        })

        // this.children.searchbar = new Input({
        //     className: "chat-sidebar__searchbar",
        //     placeholder: "Поиск",
        //     type: "text",
        //     name: "chat-search"
        // });
    }

    chats() {
        if (this.props.chats) {
            this.children.userChat = this.props.chats.map((chat: chat) => {
                return new UserChats({
                    img: chat.avatar ? `${avatarURL}${chat.avatar}` : noAvatar as string,
                    name: chat.title,
                    message: chat.last_message?.content,
                    notifications: chat.unread_count,
                    events: {
                        click: () => {
                            this.props.setChatProps(chat)
                        }
                    }
                })
            })
        }
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        return !isEqual(oldProps, newProps)
    }

    protected render(): DocumentFragment {
        this.chats();
        return this.compile(template, this.props);
    }
}

export const Sidebar = withRouter(SidebarBase);
