import Block from "../../utils/Block";
import template from "./login.hbs";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import UserController from "../../services/userController";
import { withRouter } from "../../HOC/withRoutes";
import { Routes } from "../../utils/Routes";

interface LoginContainerProps {
    reason?: null
    events?: {
        submit: (event: SubmitEvent) => void
    }
}

class LoginContainerBase extends Block {
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
                    this.children.loginInput.setProps({ value });
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
                    this.children.passwordInput.setProps({ value });
                }
            }
        });

        this.children.submit = new Button({
            className: "button-submit",
            type: "submit",
            text: "Войти",
            events: {
                click: async (event: PointerEvent) => {
                    event.preventDefault();
                    const login = this.children.loginInput.getProp("value");
                    const password = this.children.passwordInput.getProp("value");
                    const user = await UserController
                        .setUser({ login, password })
                        .catch(e => e);
                    if(user?.reason) {
                        this.setProps({
                            reason: user.reason
                        })
                        return;
                    }
                    this.props.router.go(Routes.Chat);
                }
            }
        });

        this.children.registartionLink = new Link({
            className: "link-button",
            text: "Нет аккаунта?",
            events: {
                click: () => {
                    this.props.router.go(Routes.Registration)
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export const LoginContainer = withRouter(LoginContainerBase);
