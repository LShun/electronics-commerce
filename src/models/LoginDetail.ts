import User from "./User";

interface LoginDetail {
    accessToken:string | undefined,
    user:User | undefined
}

export default LoginDetail;