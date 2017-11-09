import {TVAccountClassInterface, TVAccountInterface} from "./interfaces";
/**
 * @class Account
 * @description
 * TV Account class
 **/

export class Account implements TVAccountClassInterface {
    private _request: any;
    private _configs: any;

    constructor(request: any, configs: any) {
        this._request = request;
        this._configs = configs;
    }

    /**
     * get client account
     * @method get
     * @returns {Promise<TVAccountInterface[]>}
     */
    public async get(): Promise<TVAccountInterface[]> {

        return (await this._request.get('/account')).body.users;
    }
}