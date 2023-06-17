import Block from "../../utils/Block";
import template from "./profile.hbs";

import arrow from "../../images/arrow.svg";
import infos from "../../data/info.json";

import { Avatar } from "../../components/Profile/Avatar";
import { Link } from "../../components/Link";
import { ProfileInfo } from "../../components/Profile/ProfileInfo";

interface ProfilePageProps {
    name: string
}

export class ProfilePage extends Block {
    constructor(props: ProfilePageProps) {
        super(props)
    }

    protected init(): void {
        this.children.linkBack = new Link({
            img: arrow as string,
            alt: "Назад",
            className: "profile-page__back-link",
            to: "/chat"
        });

        this.children.avatar = new Avatar({
            alt: this.props.name,
            edit: "true"
        });

        this.children.profileInfo = infos.map((info) => {
            return new ProfileInfo({
                text: info.text,
                placeholder: info.placeholder
            })
        })

        this.children.linkChangeData = new Link({
            text: "Изменить данные",
            to: "/profile/change-info",
            className: "link-button"
        })

        this.children.linkChangePassword = new Link({
            text: "Изменить пароль",
            to: "/profile/change-password",
            className: "link-button"
        })

        this.children.linkExit = new Link({
            text: "Выйти",
            to: "/login",
            className: "link-button red"
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
