import Block from "../../../utils/Block";
import { Dropdown } from "../../Dropdown";
import template from "./chatHeader.hbs";

import image from "../../../images/options.svg";
import noImage from "../../../images/no-image.svg";
import { Modal } from "../../../pages/ChatPage";

interface ChatHeaderProps {
    img?: string | null;
    name: string;
    setModal: (modal: Modal) => void;
    deleteChat: () => void;
}

export class ChatHeader extends Block {
    constructor(props: ChatHeaderProps) {
        super(props);
    }

    protected init(): void {
        if(!this.props.img) {
            this.setProps({
                img: noImage as string,
            })
        }

        const options = [
            { text: "Добавить пользователя", className: "", click: () => this.props.setModal({ type: "add", show: true }) },
            { text: "Удалить пользователя", className: "", click: () => this.props.setModal({ type: "delete", show: true }) },
            { text: "Удалить чат", className: "options-dropdown__delete", click: () => this.props.deleteChat() }
        ];

        this.children.dropdown = new Dropdown({
            className: "chat-section__header__options-wrap",
            img: image as string,
            options: options
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
