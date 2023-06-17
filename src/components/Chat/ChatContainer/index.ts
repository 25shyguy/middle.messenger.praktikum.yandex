import Block from "../../../utils/Block";
import template from "./chat.hbs";
import messages from "../../../data/messages.json";

import { ChatHeader } from "../ChatHeader";
import { ChatWindow } from "../ChatWindow";
import { ChatForm } from "../ChatForm";

export class Chat extends Block {
    constructor(props = {}) {
        super(props)
    }

    protected init(): void {
        this.children.chatHeader = new ChatHeader({
            name: "Ivan",
        });
        this.children.chatWindow = new ChatWindow({
            messages: messages
        });
        this.children.chatForm = new ChatForm({});
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
