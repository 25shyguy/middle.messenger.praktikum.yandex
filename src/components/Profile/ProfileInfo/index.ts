import Block from "../../../utils/Block";
import template from "./profileInfo.hbs";


interface ProfileInfoProps {
    text: string;
    placeholder: string;
}

export class ProfileInfo extends Block {
    constructor(props: ProfileInfoProps) {
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
