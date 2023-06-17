import { Link } from "../../components/Link";
import Block from "../../utils/Block";
import template from "./error.hbs";

interface ErrorPageProps {
    errorCode: string;
    errorText: string;
}

export class ErrorPage extends Block {
    constructor(props: ErrorPageProps) {
        super(props)
    }

    protected init(): void {
        this.children.link = new Link({
            text: "Назад к чатам",
            to: "/chat",
            className: "link-button"
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
