import Block from "../../../utils/Block"
import template from "./avatar.hbs";

import noImage from "../../../images/no-image.svg";

interface AvatarProps {
    img?: string;
    alt?: string;
    edit: string;
    style?: string;
}

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super(props)
    }

    protected init(): void {
        if(!this.props.img) {
            this.setProps({
                img: noImage as string,
                style: "width: 50%;"
            })
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
