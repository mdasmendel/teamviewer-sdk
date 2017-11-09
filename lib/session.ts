import {TVSessionClassInterface, TVSessionInterface, TVSessionsListInterface} from "./interfaces";
import {TVNewSessionInterface} from "./interfaces/session";
/**
 * @class Session
 * @description
 * TV Session class
 **/

export class Session implements TVSessionClassInterface{
    private _request: any;
    private _configs: any;

    constructor(request: any, configs: any) {
        this._request = request;
        this._configs = configs;
    }

    /**
     * get client account
     * @method get
     * @returns {Promise<TVSessionsListInterface>}
     */
    public async get(params?: any): Promise<TVSessionsListInterface> {

        return (await this._request.get('/sessions', params)).body;
    }

    /**
     * get session by id
     * @method getById
     * @returns {Promise<TVSessionInterface>}
     */
    public async getById(id: string): Promise<TVSessionInterface> {

        return (await this._request.get(`/sessions/${id}`)).body;
    }

    /**
     * Creates a single session
     * @method create
     * @param {TVNewSessionInterface} session the Supporter data
     * @returns {Promise<TVSessionInterface>}
     */
    public async create(session: TVNewSessionInterface): Promise<TVSessionInterface> {
        return (await this._request.post('/sessions', session)).body;
    }

    /**
     * Updates a single company session
     * @method updateById
     * @param {string} code the user id data
     * @param {object} session the session data
     * @returns {Promise<TVSessionInterface>}
     */
    public async updateByCode(code: string, session: any): Promise<TVSessionInterface> {
        return (await this._request.put(`/sessions/${code}`, session)).body;
    }

    /**
     * Close a session
     * @method updateById
     * @param {string} code the user id data
     * @returns {Promise<TVSessionInterface>}
     */
    public async close(code: string): Promise<TVSessionInterface> {
        return this.updateByCode(code, {
            state: 'closed'
        })
    }

}
