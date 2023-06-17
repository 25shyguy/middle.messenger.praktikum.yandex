import Block from "../../../utils/Block";
import { Dropdown } from "../../Dropdown";
import template from "./chatHeader.hbs";

import image from "../../../images/options.svg";
import noImage from "../../../images/no-image.svg";

interface ChatHeaderProps {
    img?: string;
    name: string;
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
            // eslint-disable-next-line no-console
            { text: "Добавить пользователя", className: "", click: (event: PointerEvent) => { console.log("Dropdown: ", event) } },
            // eslint-disable-next-line no-console
            { text: "Удалить пользователя", className: "", click: (event: PointerEvent) => { console.log("Dropdown: ", event) } },
            // eslint-disable-next-line no-console
            { text: "Удалить чат", className: "options-dropdown__delete", click: (event: PointerEvent) => { console.log("Dropdown: ", event) } }
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
