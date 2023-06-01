import Block from "../../utils/Block";
import template from "./button.hbs";

interface ButtonProps {
    text?: string;
    type: string;
    className: string;
    img?: string;
    events?: {
        click: (event: PointerEvent) => void;
    }
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props)
    }
}
