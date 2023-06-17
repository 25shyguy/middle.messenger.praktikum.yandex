import Block from "../../utils/Block";
import template from "./login.hbs";

import { LoginContainer } from "../../components/Login";

export class LoginPage extends Block {
    constructor(props = {}) {
        super(props);
    }

    protected init(): void {
        this.children.loginContainer = new LoginContainer({})
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
