import Block from "../../utils/Block";
import template from "./chatPage.hbs";

import { Chat } from "../../components/Chat/ChatContainer";
import { Sidebar } from "../../components/Sidebar";

export class ChatPage extends Block {
    constructor(props = {}) {
        super(props)
    }

    protected init(): void {
        this.children.chat = new Chat();
        this.children.sidebar = new Sidebar();
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
