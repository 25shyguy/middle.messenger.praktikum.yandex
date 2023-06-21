import Block from "../../utils/Block";
import template from "./profilePageInfo.hbs";

import arrow from "../../images/arrow.svg";
import { Link } from "../../components/Link";
import { Avatar } from "../../components/Profile/Avatar";
import { ChangeInfoForm } from "../../components/Profile/ChangeInfo";
import { withRouter } from "../../HOC/withRoutes";

class ProfilePageInfoBase extends Block {
    constructor(props = {}) {
        super(props)
    }

    protected init(): void {
        this.children.linkBack = new Link({
            img: arrow as string,
            alt: "Назад",
            className: "profile-page__back-link",
            events: {
                click: (event: PointerEvent) => {
                    this.props.router.go("/profile")
                }
            }
        });

        this.children.avatar = new Avatar({
            edit: "false"
        });

        this.children.form = new ChangeInfoForm({})
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export const ProfilePageInfo = withRouter(ProfilePageInfoBase)
