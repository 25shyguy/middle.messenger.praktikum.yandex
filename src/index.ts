import { ChatPage } from "./pages/ChatPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfileChangePasswordPage } from "./pages/ProfileChangePasswordPage";
import { ProfilePageInfo } from "./pages/ProfileInfoPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegistrationPage } from "./pages/RegistrationPage";
import UserController from "./services/userController";
import Router from "./utils/Router";
import { Routes } from "./utils/Routes";
import store, { StoreEvents } from "./utils/Store";

// declare global {
//     interface Window {
//         store: Store<AppState>
//     }
// }

window.addEventListener("DOMContentLoaded", async () => {
    Router
        .use(Routes.Index, LoginPage)
        .use(Routes.Registration, RegistrationPage)
        .use(Routes.Chat, ChatPage)
        .use(Routes.Proflie, ProfilePage)
        .use(Routes.ProfileChangeInfo, ProfilePageInfo)
        .use(Routes.ProfileChangePassword, ProfileChangePasswordPage)

    store.on(StoreEvents.Updated, (nextState: any) => {
        return nextState
    });

    try {
        const user = await UserController
            .getUser()
            .catch((e) => {
                return e
            })

        Router.start();

        if (user?.reason) {
            Router.go(Routes.Index)
        }
    } catch (e) {
        Router.start();
        Router.go(Routes.Index);
    }
})
