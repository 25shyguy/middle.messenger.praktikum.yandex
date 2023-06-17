import Block from "../../utils/Block";
import template from "./registration.hbs";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";

interface RegistrationContainerProps {
    events?: {
        submit: (event: SubmitEvent) => void
    }
}

export class RegistrationContainer extends Block {
    constructor(props: RegistrationContainerProps) {
        super(props)
    }

    protected init(): void {
        const inputs = [
            {
                name: "email", 
                type: "text", 
                placeholder: "Почта", 
                required: "required",
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputs[index];
                    input.setProps({
                        value: value
                    });

                    if (!input.validateEmail(value)) {
                        this.children.inputs[index].setProps({
                            error: "Ваш email не подходит"
                        });
                    } else {
                        this.children.inputs[index].setProps({
                            error: null
                        });
                    }
                }
            },
            {
                name: "login", 
                type: "text", 
                placeholder: "Логин", 
                required: "required",
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputs[index];

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
                name: "first_name", 
                type: "text", 
                placeholder: "Имя", 
                required: "required",
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputs[index];

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
                name: "second_name", 
                type: "text", 
                placeholder: "Фамилия", 
                required: "required",
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputs[index];

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
                name: "phone", 
                type: "text", 
                placeholder: "Телефон", 
                required: "required",
                keypress: (event: KeyboardEvent) => {
                    const value = (event.target as HTMLInputElement).value;
                    const length = value[0] === "+" ? 12 : 11;
                    if (isNaN(+event.key) && event.key !== "+" || value.length === length) {
                        event.preventDefault();
                    }
                },
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputs[index];
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
                    if (!input.validatePhone(value) || value.length < 10) {
                        input.setProps({
                            error: "Телефон не верен"
                        });
                    } else {
                        input.setProps({
                            error: null
                        });
                    }
                }
            },
            {
                name: "password", 
                type: "password", 
                placeholder: "Пароль", 
                required: "required",
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputs[index];

                    input.setProps({
                        value: value
                    });

                    if (value.length < 8 || value.length > 40) {
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
            },
            {
                name: "repeatPassword", 
                type: "password", 
                placeholder: "Пароль (Еще раз)", 
                required: "required",
                validation: (event: InputEvent, index: number) => {
                    const value = (event.target as HTMLInputElement).value;
                    const input = this.children.inputs[index];

                    input.setProps({
                        value: value
                    });

                    if (value.length < 8 || value.length > 40) {
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
            },
        ];

        this.children.inputs = inputs.map((input, index) => {
            return new Input({
                name: input.name,
                type: input.type,
                placeholder: input.placeholder,
                required: input.required,
                className: "login-form__input",
                events: {
                    keypress: (event: KeyboardEvent) => {
                        if(input.keypress) {
                            input.keypress(event)
                        }
                    },
                    focusin: (event: InputEvent) => input.validation(event, index),
                    change: (event: InputEvent) => input.validation(event, index)
                }
            });
        });

        this.children.submit = new Button({
            className: "button-submit",
            type: "submit",
            text: "Зарегистрироваться",
            events: {
                click: (event: PointerEvent) => {
                    event.preventDefault();
                    let isValid = true;
                    let password = "";

                    this.children.inputs.forEach((input: Input) => {
                        if (input.getProp("name") === "password") {
                            password = input.getProp("value")
                        }

                        if (input.getProp("name") === "repeatPassword" && input.getProp("value") !== password) {
                            input.setProps({
                                error: "Пароли не совпадают!"
                            })
                        }
                        if (input.getProp("error") || input.getProp("value") === undefined) {
                            input.setFocus();
                            isValid = false;
                        }
                    });

                    if (isValid) {
                        const result = this.children.inputs.reduce((acc = {}, input: Input) => {
                            return { ...acc, [input.getProp("name")]: input.getProp("value") }
                        }, {});
                        // eslint-disable-next-line no-console
                        console.log(result);
                    }
                }
            }
        });

        this.children.loginLink = new Link({
            className: "link-button",
            to: "/login",
            text: "Войти"
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
