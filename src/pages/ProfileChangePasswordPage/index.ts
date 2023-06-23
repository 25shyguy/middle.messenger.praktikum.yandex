import Block from "../../utils/Block";
import template from "./profileChangePassword.hbs";

import arrow from "../../images/arrow.svg";

import { Link } from "../../components/Link";
import { Avatar } from "../../components/Profile/Avatar";
import { ChangePasswordForm } from "../../components/Profile/ChangePasswordForm";
import { withRouter } from "../../HOC/withRoutes";
import { withStore } from "../../utils/Store";
import { Routes } from "../../utils/Routes";

class ProfileChangePassword extends Block {
    constructor(props = {}) {
        super(props);
    }

    protected init(): void {
        this.children.linkBack = new Link({
            img: arrow as string,
            alt: "Назад",
            className: "profile-page__back-link",
            events: {
                click: () => {
                    this.props.router.go(Routes.Proflie)
                }
            }
        });

        this.children.avatar = new Avatar({
            img: this.props.avatar,
            alt: this.props.login,
            edit: "false"
        });

        this.children.form = new ChangePasswordForm({})
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
const withUser = withStore((state) => ({ ...state.user }))
export const ProfileChangePasswordPage = withRouter(withUser(ProfileChangePassword))
