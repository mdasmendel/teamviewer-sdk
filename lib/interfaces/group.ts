export interface TVGroupClassInterface {
    get(params?: any): Promise<TVGroupsListInterface>,
}

export interface TVGroupInterface {
    id: string,
    name: string,
    shared_with: any,
}

export interface TVGroupsListInterface {
    groups: TVGroupInterface[]
}