import Block from "../../../utils/Block";
import template from "./form.hbs";

import { Input } from "../../Input";
import { Button } from "../../Button";
import UserController from "../../../services/userController";
import { withStore } from "../../../utils/Store";
import isEqual from "../../../utils/isEqual";

interface ChangeInfoFormProps {
    message?: {
        type: "success",
        value: ""
    }
    events?: {
        submit: (event: SubmitEvent) => void
    }
}

class ChangeInfoFormBase extends Block {
    constructor(props: ChangeInfoFormProps) {
        super(props);
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        return !isEqual(oldProps, newProps)
    }

    protected init(): void {
        const inputs = [
            { 
                text: "Почта", 
                placeholder: this.props.email, 
                id: "mail-input", 
                type: "text", 
                name: "email", 
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputInfo[index];
                    input.setProps({
                        value: value
                    });

                    if (!input.validateEmail(value)) {
                        this.children.inputInfo[index].setProps({
                            error: "Ваш email не подходит"
                        });
                    } else {
                        this.children.inputInfo[index].setProps({
                            error: null
                        });
                    }
                }
            },
            { 
                text: "Логин", 
                placeholder: this.props.login, 
                id: "login-input", 
                type: "text", 
                name: "login",
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputInfo[index];

                    input.setProps({
                        value: value
                    });

                    if (value.length < 3) {
                        input.setProps({
                            error: "Логин слишком короткий!"
                        });
                    } else if (!input.validateLogin(value)) {
                        input.setProps({
                            error: "Логин может содержать только буквы [A-Z] совместно с цифрами или без них!"
                        });
                    } else {
                        input.setProps({
                            error: ""
                        });
                    }
                }
            },
            { 
                text: "Имя", 
                placeholder: this.props.first_name, 
                id: "first_name-input", 
                type: "text", 
                name: "first_name",
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputInfo[index];

                    input.setProps({
                        value: input.capitalizeName(value)
                    });

                    if (!input.validateName(value)) {
                        input.setProps({
                            error: "Используйте кириллицу или латиницу (без спец. знаков)"
                        });
                    } else {
                        input.setProps({
                            error: null
                        });
                    }
                }
            },
            { 
                text: "Фамилия", 
                placeholder: this.props.second_name, 
                id: "second_name-input", 
                type: "text", 
                name: "second_name",
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputInfo[index];

                    input.setProps({
                        value: input.capitalizeName(value)
                    });
                    if (!input.validateName(value)) {
                        input.setProps({
                            error: "Используйте кириллицу или латиницу (без спец. знаков)"
                        });
                    } else {
                        input.setProps({
                            error: null
                        });
                    }
                }
            },
            {
                text: "Имя в чате", 
                placeholder: this.props.display_name, 
                id: "display_name-input", 
                type: "text", 
                name: "display_name",
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputInfo[index];

                    input.setProps({
                        value: input.capitalizeName(value)
                    });

                    if (!input.validateName(value)) {
                        input.setProps({
                            error: "Используйте кириллицу или латиницу (без спец. знаков)"
                        });
                    } else {
                        input.setProps({
                            error: null
                        });
                    }
                }
            },
            { 
                text: "Телефон", 
                placeholder: this.props.phone, 
                id: "phone-input", 
                type: "text", 
                name: "phone",
                keypress: (event: KeyboardEvent) => {
                    const value = (event.target as HTMLInputElement).value;
                    const length = value[0] === "+" ? 12 : 11;
                    if (isNaN(+event.key) && event.key !== "+" || value.length === length) {
                        event.preventDefault();
                    }
                },
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputInfo[index];
                    input.setProps({
                        value: value
                    });
                    if (value[0] === "7") {
                        input.setProps({
                            value: "+".concat(value)
                        })
                    }
                    if (value[0] === "9") {
                        input.setProps({
                            value: "+7".concat(value)
                        })
                    }
                    if (!input.validatePhone(value)) {
                        input.setProps({
                            error: "Телефон не верен"
                        });
                    } else {
                        input.setProps({
                            error: null
                        });
                    }
                }
            }
        ]


        this.children.inputInfo = inputs.map((input, index) => {
            return new Input({
                className: "profile-page__info-name",
                value: input.placeholder,
                type: input.type,
                label: input.text,
                name: input.name,
                events: {
                    keypress: (event: KeyboardEvent) => {
                        if(input.keypress) {
                            input.keypress(event)
                        }
                    },
                    change: (event: InputEvent) => input.validation(event, index),
                    focusin: (event: InputEvent) => input.validation(event, index)
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

                    this.children.inputInfo.forEach((input: Input) => {
                        if(input.getProp("error")) {
                            input.setFocus();
                            isValid = false;
                        }
                    })

                    if(isValid) {
                        const result = this.children.inputInfo.reduce((acc = {}, input: Input) => {
                            return { ...acc, [input.getProp("name")]: input.getProp("value") }
                        }, {});
                        const user = await UserController.changeProfile(result);
                        if(user?.reason) {
                            this.setProps({
                                message: {
                                    type: "error",
                                    value: user.reason
                                }
                            })
                            return;
                        }
                        this.setProps({
                            message: {
                                type: "success",
                                value: "Информация успешно обновлена!"
                            }
                        })
                    }
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withUser = withStore((state) => ({ ...state.user }))
export const ChangeInfoForm = withUser(ChangeInfoFormBase);
