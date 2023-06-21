import Block from "../../../../utils/Block";
import template from "./user.hbs";

interface UserChatsProps {
    img?: string | null;
    name?: string;
    time?: string;
    fromYou?: boolean;
    message?: string | null;
    notifications?: number;
    events: {
        click: (event: PointerEvent) => void
    }
}

export class UserChats extends Block {
    constructor(props: UserChatsProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
