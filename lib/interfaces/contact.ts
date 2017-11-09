export interface TVContactClassInterface {
    get(): Promise<TVContactInterface[]>,
    create(contact: TVNewContactInterface): Promise<TVContactInterface>,
}

export interface TVContactInterface {
    contact_id: string,
    name: string,
    email: string,
    groupid: string,
    online_state: string,
    profilepicture_url: string,
    supported_features: string,
    groupId: string,
    invitations?: string,
}

export interface TVNewContactInterface {
    email: string,
    groupname?: string,
    groupid?: string,
    description?: string,
    invite?: boolean,
}