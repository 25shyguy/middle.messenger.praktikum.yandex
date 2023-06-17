interface User {
    id: string,
    first_name: string,
    second_name: string,
    display_name: string | null,
    login: string,
    email: string,
    phone: string,
    avatar: string | null
}

export interface AppState {
    loginFormError: string | null;
    user: User | null
}

export const defaultState: AppState = {
    loginFormError: null,
    user: null
}
