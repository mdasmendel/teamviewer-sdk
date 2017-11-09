import {
    TVUserInterface,
    TVNewUserInterface,
    TVUserClassInterface,
    TVGroupInterface,
    TVUsersListInterface,
    TVGroupsListInterface
} from "./interfaces";

/**
 * @class User
 * @description
 * TV User class
 **/

export class User implements TVUserClassInterface {
    private _request: any;
    private _configs: any;

    constructor(request: any, configs: any) {
        this._request = request;
        this._configs = configs;
    }

    /**
     * Generates random password
     * @method : Simple Password Generator
     * @param {number} length the password length
     * @returns {string}
     */
    static generatePassword(length: number = 8): string {
        // Generate a random number.
        let number = Math.random();

        // Convert this number into a string.
        let string = number.toString(36);

        // Grab a section of the string as the password
        // Return the password back!
        return string.slice(-length);
    }

    /**
     * get all users of a company with all available fields
     * @method get
     * @returns {Promise<TVUsersListInterface>}
     */
    public async get(): Promise<TVUsersListInterface> {

        return (await this._request.get('/users?full_list=true')).body;
    }

    /**
     * get user by id
     * @method getById
     * @returns {Promise<TVUserInterface>}
     */
    public async getById(id: string): Promise<TVUserInterface> {

        return (await this._request.get(`/users/${id}?full_list=true`)).body;
    }

    /**
     * get user by email
     * @method getByEmail
     * @returns {Promise<TVUsersListInterface>}
     */
    public async getByEmail(email: string): Promise<TVUsersListInterface> {

        let url = `/users?email=${encodeURIComponent(email)}&full_list=true`;
        return (await this._request.get(url)).body;
    }

    /**
     * Creates a single company user
     * @method create
     * @param {TVUserInterface} user the Supporter data
     * @returns {Promise<object>}
     */
    public async create(user: TVNewUserInterface): Promise<TVUserInterface> {

        user.permissions = user.permissions || this._configs.defaults.userPermissions;
        user.language = user.language || this._configs.defaults.userLanguage;
        user.password = user.password || User.generatePassword(8);
        // user.custom_quicksupport_id = user.custom_quicksupport_id || this._configs.defaults.custom_quicksupport_id;

        return (await this._request.post('/users', user)).body;
    }

    /**
     * Updates a single company user
     * @method updateById
     * @param {string} id the user id data
     * @param {object} user the Supporter data
     * @returns {Promise<TVUserInterface>}
     */
    public async updateById(id: string, user: any): Promise<TVUserInterface> {
        return (await this._request.put(`/users/${id}`, user)).body;
    }

    /**
     * link user to a group
     * @method linkToGroup
     * @param {string} id the user id data
     * @param {string} groupId the target group id
     * @param {object[]} users the target group id
     * @returns {Promise<boolean>}
     */
    public async unLinkToGroup(id: string, groupId: string, users: any[]): Promise<boolean> {

        return !!(await this._request.post(`/users/${id}/groups/${groupId}/unshare_group`,
            {users}));
    }

    /**
     * link user to a group
     * @method linkToGroup
     * @param {string} id the user id data
     * @param {string} groupId the target group id
     * @param {object[]} users the target group id
     * @returns {Promise<boolean>}
     */
    public async linkToGroup(id: string, groupId: string, users: any[]): Promise<boolean> {
        return !!(await this._request.post(`/users/${id}/groups/${groupId}/share_group`,
            {users}));
    }

    /**
     * get user groups
     * @method findByIdGroups
     * @param {string} id the user id data
     * @param {object} params the query params
     * @returns {Promise<TVGroupInterface[]>}
     */
    public async findByIdGroups(id: string, params?: any): Promise<TVGroupsListInterface> {
        return (await this._request.get(`/users/${id}/groups`, params)).body;
    }
}