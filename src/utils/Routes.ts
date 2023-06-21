// switch (window.location.pathname) {
//     // case "/":
//     //     renderDOM(chatPage);
//     //     break;
//     // case "/login":
//     //     renderDOM(loginPage);
//     //     break;
//     // case "/chat":
//     //     renderDOM(chatPage);
//     //     break;
//     // case "/registration":
//     //     renderDOM(registartionPage);
//     //     break;
//     case "/profile":
//         renderDOM(profilePage);
//         break;
//     // case "/profile/change-info":
//     //     renderDOM(profilePageInfo);
//     //     break;
//     // case "/profile/change-password":
//     //     renderDOM(profileChangePassword);
//     //     break;
//     // case "/not-found":
//     //     renderDOM(page404);
//     //     break;
//     // case "/500":
//     //     renderDOM(page500);
//     // break;
//     default:
//         window.location.assign("/not-found");
//         break;
// }

export enum Routes {
    Index = "/",
    Chat = "/chat",
    Proflie = "/profile",
    Registration = "/registration",
    ProfileChangeInfo = "/profile/change-info",
    ProfileChangePassword = "/profile/change-password",
    Page404 = "/404",
    Page500 = "/500"
}
