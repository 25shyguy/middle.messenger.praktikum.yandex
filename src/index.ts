import { ChatPage } from "./pages/ChatPage";
import { ErrorPage } from "./pages/ErrorPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfileChangePasswordPage } from "./pages/ProfileChangePasswordPage";
import { ProfilePageInfo } from "./pages/ProfileInfoPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegistrationPage } from "./pages/RegistrationPage";
import UserController from "./services/userController";
import { AppState, defaultState } from "./store";
import renderDOM from "./utils/renderDOM";
import store, { StoreEvents } from "./utils/Store";

// declare global {
//     interface Window {
//         store: Store<AppState>
//     }
// }

window.addEventListener("DOMContentLoaded", async () => {
    UserController.getUser();
    store.on(StoreEvents.Updated, (nextState) => {
        console.log(nextState);
    });

    const loginPage = new LoginPage();
    const registartionPage = new RegistrationPage();

    const chatPage = new ChatPage();

    const profilePage = new ProfilePage();
    const profilePageInfo = new ProfilePageInfo();
    const profileChangePassword = new ProfileChangePasswordPage();

    const page404 = new ErrorPage({ errorCode: "404", errorText: "Не туда попали" });
    const page500 = new ErrorPage({ errorCode: "500", errorText: "Мы уже фиксим" })

    // await UserController.getUser()

    switch (window.location.pathname) {
        case "/":
            renderDOM(chatPage);
            break;
        case "/login":
            renderDOM(loginPage);
            break;
        case "/chat":
            renderDOM(chatPage);
            break;
        case "/registration":
            renderDOM(registartionPage);
            break;
        case "/profile":
            renderDOM(profilePage);
            break;
        case "/profile/change-info":
            renderDOM(profilePageInfo);
            break;
        case "/profile/change-password":
            renderDOM(profileChangePassword);
            break;
        case "/not-found":
            renderDOM(page404);
            break;
        case "/500":
            renderDOM(page500);
            break;
        default:
            window.location.assign("/not-found");
            break;
    }
    
})
