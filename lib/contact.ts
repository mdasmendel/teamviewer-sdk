import {TVContactClassInterface, TVContactInterface, TVNewContactInterface} from "./interfaces";
/**
 * @class Conatact
 * @description
 * TV Conatact class
 **/

export class Contact implements TVContactClassInterface {
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
    public async get(): Promise<TVContactInterface[]> {

        return (await this._request.get('/contacts')).body.users;
    }

    /**
     * Creates a single company contact
     * @method create
     * @param {TVNewContactInterface} contact the contact data
     * @returns {Promise<object>}
     */
    public async create(contact: TVNewContactInterface): Promise<TVContactInterface> {

        return (await this._request.post('/contacts', contact)).body;
    }
}