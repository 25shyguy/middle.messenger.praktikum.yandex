import Block from "../../../../../utils/Block";
import template from "./messagesContainer.hbs";

export class MessgaeContainer extends Block {
    constructor(props = {}) {
        super(props)
    }
    
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
