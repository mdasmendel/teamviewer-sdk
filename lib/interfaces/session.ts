export interface TVSessionClassInterface {
    get(params?: any): Promise<TVSessionsListInterface>,
    create(session: TVNewSessionInterface): Promise<TVSessionInterface>,
    updateByCode(code: string, session: any): Promise<TVSessionInterface>,
    close(code: string): Promise<TVSessionInterface>,
    getById(id: string): Promise<TVSessionInterface>,
}

export interface TVNewSessionInterface {
    name: string,
    groupid: string,
    assigned_userid: string,
    end_customer: {
        name: string,
        email: string
    }
}
export interface TVSessionInterface {
    name?: string,
    code?: string,
    email?: string,
    groupid?: string,
    groupname?: string,
    assigned_userid?: string,
}

export interface TVSessionsListInterface {
    sessions: TVSessionInterface[],
    sessions_remaining: number,
    next_offset: number,
}