import { withRouter } from "../../HOC/withRoutes";
import Block from "../../utils/Block";
import template from "./link.hbs";

interface LinkProps {
    img?: string;
    alt?: string;
    className: string;
    text?: string;
    events?: {
        click?: (event: PointerEvent) => void
    } 
}

export class Link extends Block {
    constructor(props: LinkProps) {
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
