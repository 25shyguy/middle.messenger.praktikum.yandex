import Block from "../../../utils/Block"
import template from "./avatar.hbs";

import noImage from "../../../images/no-image.svg";
import userController from "../../../services/userController";

interface AvatarProps {
    img?: string;
    alt?: string;
    edit: string;
    style?: string;
    events?: {
        click: (event: PointerEvent) => void
    }
}

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super(props)
    }

    protected init(): void {
        userController.getUser();
        this.setProps({
            img: this.props.img !== null ? this.props.img : noImage,
            style: this.props.img !== null ? "" : "width: 50%;"
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
