import Block from "../../../utils/Block";
import template from "./user.hbs";
import noImage from "../../../images/no-image.svg";
const avatarURL = "https://ya-praktikum.tech/api/v2/resources"

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
        this.setProps({
            avatar: this.props.avatar ? `${avatarURL}${this.props.avatar}`: noImage as string,
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
