import Block from "../../utils/Block";
import template from "./textarea.hbs";

interface TextareaProps {
    name: string;
    cols: string;
    rows: string;
    placeholder: string;
    className: string;
    events?: {
        change: (event: InputEvent) => void
    }
}

export class Textarea extends Block {
    constructor(props: TextareaProps) {
        super(props);
    }

    public getProp(name: string) {
        return this.props[name]
    }

    public getValue() {
        return (this.element as HTMLInputElement).value
    }

    public setValue(value: string) {
        return (this.element as HTMLInputElement).value = value;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
