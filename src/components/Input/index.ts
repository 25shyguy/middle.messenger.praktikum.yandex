import Block from "../../utils/Block";
import template from "./input.hbs";

interface InputProps {
    className: string;
    placeholder?: string;
    type: string;
    label?: string;
    name: string;
    value?: string;
    required?: string;
    error?: string | null;
    accept?: string;
    events?: {
        keypress?: (event: KeyboardEvent) => void,
        change?: (event: InputEvent) => void,
        focusin?: (event: InputEvent) => void,
        focusout?: (event: InputEvent) => void,
        blur?: (event: InputEvent) => void
    }
}

export class Input extends Block {
    constructor(props: InputProps) {
        super(props)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps.error !== newProps.error) {
            return true
        }

        if (oldProps.value !== newProps.value) {
            return true
        }

        return false
    }

    public getProp(name: string) {
        return this.props[name]
    }

    public setFocus() {
        (this.element as HTMLInputElement).focus();
    }

    public validateEmail(email: string) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    public validatePhone(phone: string) {
        return String(phone)
            .toLowerCase()
            .match(/\d/);
    }

    public validateName(name: string) {
        return String(name)
            .toLowerCase()
            .match(/^[А-ЯA-Zё]+$/ui)
    }

    public capitalizeName(name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    public validateLogin(login: string) {
        return String(login)
            .toLowerCase()
            .match(/^[^\d][^<>!@#$%^&*()[\],./\\`~]*$/)
    }

    public validatePassword(password: string) {
        return String(password).match(/[\w\d](?=.*[0-9])(?=.*[A-Z])/)
    }

    protected render(): DocumentFragment {
        this.init();
        return this.compile(template, this.props);
    }
}
