import Block from "../../../utils/Block";
import template from "./message.hbs";

type message = {
    text?: string | null;
    isYou?: boolean;
    time?: string;
    read?: boolean | null;
    img?: string | null;
}

interface MessageProps {
    messages: message[];
}

export class Message extends Block {
    constructor(props = {}) {
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
