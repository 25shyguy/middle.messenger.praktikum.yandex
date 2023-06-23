import Block from "../../../utils/Block";
import template from "./chatForm.hbs";

import { Button } from "../../Button";
import { Dropdown } from "../../Dropdown";
import { Textarea } from "../../Textarea";

import submitButtonImage from "../../../images/arrow.svg";
import attachmentButtonImage from "../../../images/attchment.svg";
import { MessageController } from "../../../services/MessageController";

interface ChatFormProps {
    messageController: MessageController | null
    events?: {
        submit: (event: SubmitEvent) => void
    }
}

export class ChatForm extends Block {
    constructor(props: ChatFormProps) {
        super(props)
    }

    protected init(): void {
        const options = [
            { text: "Фото или Видео", className: "", click: (event: PointerEvent) => { return event } },
            { text: "Файл", className: "", click: (event: PointerEvent) => { return event } },
            { text: "Локация", className: "", click: (event: PointerEvent) => { return event } }
        ];

        this.children.attachments = new Dropdown({
            className: "chat-attachments",
            img: attachmentButtonImage as string,
            options: options
        })
        
        this.children.textarea = new Textarea({
            name: "messages",
            cols: "30",
            rows: "10",
            placeholder: "Сообщение",
            className: "chat-textarea"
        })
        
        this.children.submitButton = new Button({
            className: "chat-send-message",
            type: "submit",
            img: submitButtonImage as string,
            events: {
                click: (event: PointerEvent) => {
                    event.preventDefault();
                    const textarea = this.children.textarea;
                    if (textarea.getValue().trim().length === 0) {
                        textarea.setValue("");
                        return;
                    }

                    this.props.messageController.send(textarea.getValue(), "message");
                    textarea.setValue("");

                }
            }
        })
    }

    protected render(): DocumentFragment {
        this.init();
        return this.compile(template, this.props);
    }
}
