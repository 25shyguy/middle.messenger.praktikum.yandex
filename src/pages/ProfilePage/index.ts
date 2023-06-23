import Block from "../../utils/Block";
import template from "./profile.hbs";

import arrow from "../../images/arrow.svg";

import { Avatar } from "../../components/Profile/Avatar";
import { Link } from "../../components/Link";

import UserController from "../../services/userController";
import { withStore } from "../../utils/Store";
import isEqual from "../../utils/isEqual";
import { ProfileInfo } from "../../components/Profile/ProfileInfo";
import { withRouter } from "../../HOC/withRoutes";
import { Modal } from "../../components/Modal";
import { Routes } from "../../utils/Routes";

interface Profile {
    avatar: string;
    display_name: string
    email: string;
    first_name: string
    id: number
    login: string
    phone: string;
    second_name: string
    status: string | null
}

class ProfilePageBase extends Block {
    protected init() {
        this.children.profileEmail = new ProfileInfo({
            text: "email",
            placeholder: this.props.email
        })
        this.children.ProfileLogin = new ProfileInfo({
            text: "Логин",
            placeholder: this.props.login
        })
        this.children.ProfileName = new ProfileInfo({
            text: "Имя",
            placeholder: this.props.first_name
        })
        this.children.ProfileSecondName = new ProfileInfo({
            text: "Фамилия",
            placeholder: this.props.second_name
        })
        this.children.ProfileDisplayName = new ProfileInfo({
            text: "Имя в чате",
            placeholder: this.props.display_name
        })
        this.children.ProfilePhone = new ProfileInfo({
            text: "Телефон",
            placeholder: this.props.phone
        })

        this.children.linkBack = new Link({
            img: arrow as string,
            alt: "Назад",
            className: "profile-page__back-link",
            events: {
                click: () => {
                    this.props.router.go(Routes.Chat)
                }
            }
        });

        this.children.modal = new Modal({
            changeAvatar: this.changeAvatar.bind(this),
            show: false,
        });

        this.children.linkChangeData = new Link({
            text: "Изменить данные",
            className: "link-button",
            events: {
                click: () => {
                    this.props.router.go(Routes.ProfileChangeInfo)
                }
            }
        })

        this.children.linkChangePassword = new Link({
            text: "Изменить пароль",
            className: "link-button",
            events: {
                click: () => {
                    this.props.router.go(Routes.ProfileChangePassword)
                }
            }
        })

        this.children.linkExit = new Link({
            text: "Выйти",
            className: "link-button red",
            events: {
                click: () => {
                    UserController.logout();
                    this.props.router.go(Routes.Index)
                }
            }
        })
    }

    avatar() {
        this.children.avatar = new Avatar({
            img: this.props.avatar,
            alt: this.props.login,
            edit: "true",
            events: {
                click: () => {
                    this.children.modal.setProps({
                        show: true
                    })
                }
            }
        });
    }

    changeAvatar(data: Profile) {
        this.setProps({
            avatar: data.avatar
        })
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        return !isEqual(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        this.avatar();
        return this.compile(template, this.props);
    }
}

const withUser = withStore((state) => ({ ...state.user }))
export const ProfilePage = withRouter(withUser(ProfilePageBase));
