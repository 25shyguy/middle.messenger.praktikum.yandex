import Block from "../../../utils/Block"
import template from "./avatar.hbs";

import noImage from "../../../images/no-image.svg";
import userController from "../../../services/userController";
import { withStore } from "../../../utils/Store";

interface AvatarProps {
    img?: string;
    alt?: string;
    edit: string;
    style?: string;
}

class AvatarBase extends Block {
    constructor(props: AvatarProps) {
        super(props)
    }

    protected init(): void {
        userController.getUser();
        if(!this.props?.user?.avatar) {
            this.setProps({
                img: noImage as string,
                style: "width: 50%;"
            })
        } else {
            this.setProps({
                img: this.props.user.avatar,
            })
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withUser = withStore((state) => ({ ...state }))

export const Avatar = withUser(AvatarBase);
