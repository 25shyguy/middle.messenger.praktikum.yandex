import Block from "../../../utils/Block";
import { Message as MessagePartial } from "../Message";
import template from "./chatWindow.hbs";

interface Messages {
    data: Data;
}
interface Data {
    date: string;
    messages: Message[];
}

interface Message {
    text?: string | null;
    isYou: boolean;
    time: string;
    read?: boolean | null;
    img?: string | null;
}

interface ChatWindowProps {
    messages: Messages[]
}

export class ChatWindow extends Block {
    constructor(props: ChatWindowProps) {
        super(props)
    }

    protected init(): void {
        let messagesBlock = null;
        this.props.messages.forEach((message: Messages) => {
            messagesBlock = message.data.messages.map((item) => {
                return new MessagePartial({
                    text: item.text,
                    isYou: item.isYou,
                    time: item.time,
                    read: item.read,
                    img: item.img
                })
            })
        });
        // console.log('messages', messagesBlock);
        this.children.message = messagesBlock;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
