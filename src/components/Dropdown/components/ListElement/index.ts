import Block from "../../../../utils/Block";
import template from "./listElement.hbs";

interface ListElementProps {
    className: string,
    text: string;
    events: {
        click: (event: PointerEvent) => void
    }
}

export class ListElement extends Block {
    constructor(props: ListElementProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
