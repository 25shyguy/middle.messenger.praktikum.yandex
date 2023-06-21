import Block from "../../../utils/Block";
import template from "./user.hbs";
import noImage from "../../../images/no-image.svg";


interface UserProps {
    avatar: string | null;
    login: string;
    events?: {
        click: (event: PointerEvent) => void
    }
}

export class Users extends Block {
    constructor(props: UserProps) {
        super(props)
    }

    protected init(): void {
        if (!this.props.avatar) {
            this.setProps({
                avatar: noImage as string,
            })
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
