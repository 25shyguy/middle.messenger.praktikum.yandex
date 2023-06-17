import Block from "../../../utils/Block";
import template from "./date.hbs";

interface DateProps {
    date: string;
}

export class Date extends Block {
    constructor(props: DateProps) {
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
