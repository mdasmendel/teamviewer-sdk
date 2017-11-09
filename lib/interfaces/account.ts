export interface TVAccountClassInterface {
    get(): Promise<TVAccountInterface[]>,
}

export interface TVNewAccountInterface {
}
export interface TVAccountInterface {
    name: string,
    email: string,
    userid: string,
    company_name?: string,
}