import Block from "../../../../utils/Block";
import { ListElement } from "../ListElement";
import template from "./list.hbs";

type option = {
    className: string,
    text: string,
    click: (event: PointerEvent) => void
}

interface ListProps {
    show: boolean;
    options: option[];
}

export class List extends Block {
    constructor(props: ListProps) {
        super(props)
    }

    protected init(): void {
        this.children.options = this.props.options.map((option: option) => {
            return new ListElement({
                className: option.className,
                text: option.text,
                events: {
                    click: (event: PointerEvent) => option.click(event)
                }
            })
        }) 
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
