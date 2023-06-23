import { withRouter } from "../../HOC/withRoutes";
import userController from "../../services/userController";
import Block from "../../utils/Block";
import { Button } from "../Button";
import { Input } from "../Input";
import template from "./modal.hbs";

import cross from "../../images/cross.svg";

interface ModalProps {
    show?: boolean,
    message?: {
        type: string,
        value: string,
    }
    events?: {
        submit: (event: FormDataEvent) => void
    }
    changeAvatar?: (data: any) => void

}

class ModalBase extends Block {
    constructor(props: ModalProps) {
        super(props)
    }
    protected init(): void {
        this.children.closeButton = new Button({
            className: "modal_close-button",
            type: "button",
            img: cross,
            events: {
                click: () => {
                    this.setProps({
                        show: false
                    })
                }
            }
        })
        
        this.children.input = new Input({
            name: "avatar",
            type: "file",
            className: "modal_form_input",
            accept: "image/png, image/jpeg",
            label: "Выбрать файл на компьютере"
        });

        this.children.buttonSubmit = new Button({
            className: "button-submit",
            type: "submit",
            text: "Применить",
            events: {
                click: async (event: PointerEvent) => {
                    event.preventDefault();
                    const form = this.getContent()?.getElementsByTagName("form")[0];
                    await this.onSubmit(form as HTMLFormElement);
                }
            }
        }); 
    }

    async onSubmit(form: HTMLFormElement): Promise<void> {
        console.log(this.props);
        const files = form.avatar.files;
        if (files.length === 0) {
            this.setProps({
                message: {
                    type: "error",
                    value: "Выбирите файл!"
                }
            })
            return;
        }
        const formData = new FormData(form);
        const data = await userController.changeAvatar(formData).catch(e => e);
        this.props.changeAvatar(data);
        if (data.response?.reason || data.status === 500) {
            this.setProps({
                message: {
                    type: "error",
                    value: "Что-то пошло не так!"
                }
            })
            return;
        }
        this.setProps({
            message: {
                type: "success",
                value: "Аватар успешно изменен!"
            }
        })
        return data
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export const Modal = withRouter(ModalBase);
