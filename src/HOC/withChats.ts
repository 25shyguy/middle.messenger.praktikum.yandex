import ChatController from "../services/ChatController";
import Block from "../utils/Block";
import Router from "../utils/Router";

export async function withChats(Component: typeof Block) {
    const chats = await ChatController.getChats();
    return class WithRouter extends Component {
        constructor(props: any) {
            super({ ...props, chats: chats });
        }
    }
}

export interface PropsWithRouter {
    router: typeof Router;
}
