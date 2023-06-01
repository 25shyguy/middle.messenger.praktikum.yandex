import Block from "../../utils/Block";
import { Button } from "../Button";
import { List } from "./components/List";
import template from "./dropdown.hbs";

type option = {
    className: string,
    text: string,
    click: (event: PointerEvent) => void
}

interface DropdownProps { 
    className: string;
    img: string;
    options: option[];
}

export class Dropdown extends Block {
    constructor(props: DropdownProps) {
        super(props)
    }

    protected init(): void {
        this.children.list = new List({
            show: false,
            options: this.props.options
        })

        this.children.button = new Button({
            img: this.props.img,
            className: "",
            type: "button",
            events: {
                click: () => {
                    this.children.list.setProps({
                        show: !this.children.list.props.show
                    })
                }
            }
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
