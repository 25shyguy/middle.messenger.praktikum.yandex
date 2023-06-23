import { Modal } from "../../../pages/ChatPage";
import ChatController from "../../../services/ChatController";
import Block from "../../../utils/Block";
import isEqual from "../../../utils/isEqual";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Users } from "../Users";
import template from "./modal.hbs";
import cross from "../../../images/cross.svg";

interface User {
    avatar: string | null;
    display_name: string | null;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    second_name: string;
}

interface DropdownModalProps {
    show: boolean;
    type: string;
    text: string;
    chatID?: number;
    userEvent: (user: string) => Promise<Record<string, any>>;
    setModal: (modal: Modal) => void;
}

export class DropdownModal extends Block {
    constructor(props: DropdownModalProps) {
        super(props)
    }

    setChosenUsers(user: User) {
        const users = this.props.users;
        if(users) {
            const isUserAdded = users.filter((item: User) => item.id === user.id);
            if (isUserAdded.length === 0) {
                return this.setProps({
                    users: [...users, user]
                })
            }
            return this.setProps({
                users: users.filter((item: User) => item.id !== user.id)
            })
        }
        this.setProps({
            users: [ user ]
        })
    }

    showFoundUsers() {
        if (!this.props.foundUsers) { return; }
        this.children.foundUsers = this.props.foundUsers.map((user: User) => new Users({
            login: user.login,
            avatar: user.avatar,
            events: {
                click: () => {
                    this.setChosenUsers(user);
                }
            }
        }));
    }

    showChosenUser() {
        if (!this.props.users) { return; }
        this.children.chosenUsers = this.props.users.map((user: User) => new Users({
            login: user.login,
            avatar: user.avatar,
        }));
    }

    async onSubmit() {
        if (this.props.users) {
            if (this.props.type === "add") {
                const users = this.props.users.map((user: User) => user.id)
                const response = await ChatController.addUsers({
                    users,
                    chatId: this.props.chatID
                }).catch(e => e);
                if (response?.reason || response?.status === 500) {
                    this.setProps({
                        message: {
                            value: "Что-то пошло не так!",
                            type: "error"
                        }
                    })
                    return;
                }
                return this.setProps({
                    message: {
                        value: "Пользователи успешно добавлены!",
                        type: "success"
                    }
                })
            }
            if (this.props.type === "delete") {
                const users = this.props.users.map((user: User) => user.id)
                const response = await ChatController.deleteChatUsers({
                    users,
                    chatId: this.props.chatID
                }).catch(e => e);
                if (response?.reason || response?.status === 500) {
                    this.setProps({
                        message: {
                            value: "Что-то пошло не так!",
                            type: "error"
                        }
                    })
                    return;
                }
                return this.setProps({
                    message: {
                        value: "Пользователи успешно удалены!",
                        type: "success"
                    }
                })
            }
            this.setProps({
                message: {
                    value: "Выберите пользователя!",
                    type: "error"
                }
            })
        }
    }


    protected async init(): Promise<void> {
        this.children.closeButton = new Button({
            className: "modal_close-button",
            type: "button",
            img: cross,
            events: {
                click: () => {
                    this.props.setModal({})
                    this.setProps({
                        show: false
                    })
                }
            }
        })


        if(this.props.type === "delete") {
            const users = await this.props.userEvent().catch((e: Error) => e);
            this.setProps({ foundUsers: users });
        }

        if(this.props.type === "add") {
            this.children.input = new Input({
                name: "user",
                type: "text",
                placeholder: "Имя пользователя",
                required: "required",
                className: "modal-input",
                events: {
                    change: async (event: InputEvent) => {
                        const value = (event.target as HTMLInputElement).value;
                        const foundUsers = await this.props.userEvent(value).catch((e: Error) => e);
                        this.setProps({ foundUsers });
                    }
                }
            });
        }

        if (this.props.type === "create") {
            this.children.input = new Input({
                name: "chat",
                type: "text",
                placeholder: "Названия чата",
                required: "required",
                className: "modal-input",
                events: {
                    change: async (event: InputEvent) => {
                        const value = (event.target as HTMLInputElement).value;
                        this.setProps({ title: value });
                    }
                }
            });
        }

        this.children.buttonSubmit = new Button({
            className: "button-submit",
            type: "submit",
            text: "Применить",
            events: {
                click: async (event: PointerEvent) => {
                    event.preventDefault();
                    if(this.props.type === "create") {
                        if(this.props.title) {
                            await this.props.userEvent(this.props.title).catch((e: Error) => e);
                            return this.setProps({
                                message: {
                                    value: "Чат создан",
                                    type: "success"
                                }
                            })
                        }
                        return this.setProps({
                            message: {
                                value: "Введите имя чата",
                                type: "error"
                            }
                        })
                    }
                    this.onSubmit();
                }
            }
        });
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        return !isEqual(oldProps, newProps);
    }
    
    protected render(): DocumentFragment {
        this.showFoundUsers();
        this.showChosenUser();
        return this.compile(template, this.props);
    }
}
