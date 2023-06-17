import Block from "../../utils/Block";
import template from "./sidebar.hbs";

import { Input } from "../Input";
import { UserChats } from "./components/User";
import chats from "../../data/chats.json";

export class Sidebar extends Block {
    constructor(props = {}) {
        super(props)
    }

    protected init(): void {
        this.children.searchbar = new Input({
            className: "chat-sidebar__searchbar",
            placeholder: "Поиск",
            type: "text",
            name: "chat-search"
        });
        this.children.userChat = chats.map((chat) => {
            return new UserChats({
                img: chat.img,
                name: chat.name,
                time: chat.time,
                fromYou: chat.fromYou,
                message: chat.message,
                notifications: chat.notifications,
                events: {
                    click: (event: PointerEvent) => {
                        console.log("Chat!")
                    }
                }
            })
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
