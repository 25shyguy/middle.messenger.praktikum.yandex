import Block from "../../utils/Block";
import template from "./login.hbs";

import { LoginContainer } from "../../components/Login";
import { withRouter } from "../../HOC/withRoutes";

class LoginPageBase extends Block {
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

export const LoginPage = withRouter(LoginPageBase)
