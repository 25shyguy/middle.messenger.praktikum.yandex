import Block from "../../utils/Block";
import template from "./login.hbs";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";

interface LoginContainerProps {
    events?: {
        submit: (event: SubmitEvent) => void
    }
}

export class LoginContainer extends Block {
    constructor(props: LoginContainerProps) {
        super(props);
    }

    protected init(): void {
        this.children.loginInput = new Input({
            name: "login",
            type: "text",
            placeholder: "Логин",
            required: "required",
            className: "login-form__input",
            events: {
                change: (event: InputEvent) => {
                    const value = (event.target as HTMLInputElement).value;
                    this.children.loginInput.setProps({ value })
                }
            }
        });

        this.children.passwordInput = new Input({
            name: "password",
            type: "password",
            placeholder: "Пароль",
            required: "required",
            className: "login-form__input",
            events: {
                change: (event: InputEvent) => {
                    const value = (event.target as HTMLInputElement).value;
                    this.children.passwordInput.setProps({ value })
                }
            }
        });

        this.children.submit = new Button({
            className: "button-submit",
            type: "submit",
            text: "Войти",
            events: {
                click: (event: PointerEvent) => {
                    event.preventDefault();
                    const login = this.children.loginInput;
                    const password = this.children.passwordInput;
                    // eslint-disable-next-line no-console
                    console.log(`${login.getProp("name")}: ${login.getProp("value")}`);
                    // eslint-disable-next-line no-console
                    console.log(`${password.getProp("name")}: ${password.getProp("value")}`);

                }
            }
        });

        this.children.registartionLink = new Link({
            className: "link-button",
            to: "/registration",
            text: "Нет аккаунта?"
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
