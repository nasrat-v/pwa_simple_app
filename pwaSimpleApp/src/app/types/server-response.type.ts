import { User, UserAuthentication } from './user.type';

export interface ResultServerResponse {
    is_success: boolean,
    msg: string
};

export interface UserAuthServerResponse {
    is_success: boolean,
    msg: string,
    user: User,
    user_auth: UserAuthentication
};

export interface UserInfoServerResponse {
    is_success: boolean,
    msg: string,
    user: User
};

export interface UserNameQueryServerResponse {
    is_success: boolean,
    msg: string,
    user_name: string
};