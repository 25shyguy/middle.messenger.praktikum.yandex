import Block from "../../../utils/Block";
import template from "./form.hbs";

import { Button } from "../../Button";
import { Input } from "../../Input";
import UserController from "../../../services/userController";

interface ChangePasswordFormProps {
    message?: {
        type: "success",
        value: ""
    }
    events?: {
        submit: (event: SubmitEvent) => void
    }
}

export class ChangePasswordForm extends Block {
    constructor(props: ChangePasswordFormProps) {
        super(props) 
    }

    protected init(): void {
        const inputs = [
            {name: "oldPassword", value: "", type: "password", label: "Старый пароль"},
            {name: "newPassword", value: "", type: "password", label: "Новый пароль"},
            {name: "repeatNewPassword", value: "", type: "password", label: "Повторите новый пароль"},
        ];

        this.children.inputPassword = inputs.map((input, index) => {
            return new Input({
                className: "profile-page__info-name",
                name: input.name,
                value: input.value,
                type: input.type,
                label: input.label,
                events: {
                    focusin: (event: InputEvent) => {
                        const value = (event.target as HTMLInputElement).value;
                        const input = this.children.inputPassword[index];

                        if(value.length === 0) {
                            input.setProps({
                                error: "Длинна пароля должна быть от 8 до 40 символов"
                            });
                        }
                    },
                    change: (event: InputEvent) => {
                        const value = (event.target as HTMLInputElement).value;
                        const input = this.children.inputPassword[index];
                        
                        input.setProps({
                            value: value
                        });

                        if(value.length < 8 || value.length > 40) {
                            input.setProps({
                                error: "Длинна пароля должна быть от 8 до 40 символов"
                            });
                        } else if (!input.validatePassword(value)) {
                            input.setProps({
                                error: "Пароль должен содержать, хотя бы одну заглавную букву [A-Z] и цифру"
                            });
                        } else {
                            input.setProps({
                                error: null
                            });
                        }
                    }
                }
            })
        });

        this.children.submit = new Button({
            className: "button-submit",
            type: "submit",
            text: "Сохранить",
            events: {
                click: async (event: PointerEvent) => {
                    event.preventDefault();
                    let isValid = true;
                    let newPassword = "";

                    this.children.inputPassword.forEach((input: Input) => {
                        if (input.getProp("name") === "newPassword") {
                            newPassword = input.getProp("value")
                        }

                        if (input.getProp("name") === "repeatNewPassword" && input.getProp("value") !== newPassword || input.getProp("value").trim() === "") {
                            input.setProps({
                                error: "Пароли не совпадают!"
                            })
                        }

                        if (input.getProp("error")) {
                            input.setFocus();
                            isValid = false;
                        }
                    });

                    if (isValid) {
                        const { newPassword, oldPassword } = this.children.inputPassword.reduce((acc = {}, input: Input) => {
                            return { ...acc, [input.getProp("name")]: input.getProp("value") }
                        }, {});
                        const user = await UserController.changePassword({ newPassword, oldPassword }).catch(e => e);

                        if (user?.reason) {
                            this.setProps({
                                message: {
                                    type: "error",
                                    value: user.reason
                                }
                            })
                            return;
                        }

                        this.children.inputPassword.forEach((input: Input) => {
                            input.setProps({
                                value: ""
                            })
                        });

                        this.setProps({
                            message: {
                                type: "success",
                                value: "Пароль изменен"
                            }
                        })
                    }
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
