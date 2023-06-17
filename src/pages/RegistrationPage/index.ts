import Block from "../../utils/Block";
import template from "./registration.hbs";

import { RegistrationContainer } from "../../components/Registration";

export class RegistrationPage extends Block {
    constructor(props = {}) {
        super(props)
    }

    protected init(): void {
        this.children.registrationContainer = new RegistrationContainer({})
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
