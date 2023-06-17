import Block from "../../utils/Block";
import template from "./profile.hbs";

import arrow from "../../images/arrow.svg";

import { Avatar } from "../../components/Profile/Avatar";
import { Link } from "../../components/Link";

import UserController from "../../services/userController";
import { withStore } from "../../utils/Store";
import isEqual from "../../utils/isEqual";
import { ProfileInfo } from "../../components/Profile/ProfileInfo";

class ProfilePageBase extends Block {

    componentDidMount(): void {
        console.log(this.props.first_name);

    }

    protected init() {

        UserController.getUser();
        this.children.profileName = new ProfileInfo({
            text: "Имя",
            placeholder: this.props.user?.first_name
        })

        this.children.linkBack = new Link({
            img: arrow as string,
            alt: "Назад",
            className: "profile-page__back-link",
            to: "/chat"
        });

        this.children.avatar = new Avatar({
            alt: this.props.user?.login,
            edit: "true"
        });

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
            className: "link-button red",
            events: {
                click: (event: PointerEvent) => {
                    event.preventDefault();
                    UserController.logout();
                }
            }
        })
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        return !isEqual(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withUser = withStore((state) => ({ ...state.user }))
export const ProfilePage = withUser(ProfilePageBase);
