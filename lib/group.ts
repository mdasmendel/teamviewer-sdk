import {TVGroupClassInterface, TVGroupsListInterface} from "./interfaces";
/**
 * @class Group
 * @description
 * TV Group class
 **/

export class Group implements TVGroupClassInterface {
    private _request: any;
    private _configs: any;

    constructor(request: any, configs: any) {
        this._request = request;
        this._configs = configs;
    }

    /**
     * get groups list
     * @method get
     * @returns {Promise<TVGroupsListInterface>}
     */
    public async get(params?: any): Promise<TVGroupsListInterface> {

        return (await this._request.get(`/groups`, params)).body;
    }
}