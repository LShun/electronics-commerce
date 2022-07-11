import LoginDetail from "../models/LoginDetail";

export const DOLOGIN = "DOLOGIN";
export const DOLOGOUT = "DOLOGOUT";

let initialState:LoginDetail = {
    accessToken: undefined,
    user: undefined
}

export type Action = {
    type:string,
    loginDetail:LoginDetail
}

export const reducer = (loginDetail:LoginDetail = initialState, action:Action):LoginDetail => {
    switch(action.type) {
        case DOLOGIN:
            return {
                accessToken:action.loginDetail.accessToken,
                user:action.loginDetail.user
            }
        case DOLOGOUT:
            return {
                accessToken:undefined,
                user:undefined
            }
    }
    return loginDetail
}