import {TVGroupsListInterface} from "./group";
export interface TVUserInterface{
    id: string,
    name: string,
    permissions: string,
    active: boolean,
    log_sessions: boolean,
    show_comment_window: boolean,
    customQuicksupportIUd?: string,
}

export interface TVUsersListInterface{
    users: TVUserInterface[]
}

export interface TVNewUserInterface{
    name: string,
    email: string,
    password?: string,
    permissions?: string,
    language?: string,
    custom_quicksupport_id?: string,
}


export interface TVUserClassInterface {
    create(user: TVNewUserInterface): Promise<TVUserInterface>,
    updateById(id: string, user: any): Promise<TVUserInterface>,
    get(): Promise<TVUsersListInterface>,
    getById(id: string): Promise<TVUserInterface>,
    findByIdGroups(id: string, params?: any): Promise<TVGroupsListInterface>,
    getByEmail(email: string): Promise<TVUsersListInterface>,
    linkToGroup(id: string, groupId: string, users: any[]): Promise<boolean>,
    unLinkToGroup(id: string, groupId: string, users: any[]): Promise<boolean>,
}
