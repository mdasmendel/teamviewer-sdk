import {User} from "./user";
import {TVUserClassInterface, TVClientInterface, TVAccountClassInterface} from "./interfaces";
import {TvRequest} from "./utils";
import {Account} from "./account";
import {TVGroupClassInterface} from "./interfaces/group";
import {Group} from "./group";
import {TVContactClassInterface} from "./interfaces/contact";
import {Contact} from "./contact";
import {TVSessionClassInterface} from "./interfaces/session";
import {Session} from "./session";

const configs = require('./config.json');

/**
 * @class Client
 * @description
 * TV client class
 **/
export class TeamViewerClient implements TVClientInterface {
    private _accessToken: string;
    private _request: any;

    //URL of the TeamViewer Management Console API
    private _apiBaseUrl: string = configs.apiBaseUrl;

    //version of the TeamViewer API
    private _apiVersion: string = configs.apiVersion;

    public user: TVUserClassInterface;

    public account: TVAccountClassInterface;

    public group: TVGroupClassInterface;

    public contact: TVContactClassInterface;

    public session: TVSessionClassInterface;

    constructor(accessToken: string,
                apiVersion?: string,
                apiBaseUrl?: string,) {
        this._accessToken = accessToken;
        this._request = new TvRequest({
            apiBaseUrl: apiBaseUrl || this._apiBaseUrl,
            apiVersion: apiVersion || this._apiVersion,
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
        });

        this.user = new User(this._request, configs);
        this.account = new Account(this._request, configs);
        this.group = new Group(this._request, configs);
        this.contact = new Contact(this._request, configs);
        this.session = new Session(this._request, configs);
    }

    /**
     * Verify connection and access token
     * @method pingApi
     * @returns {Promise<boolean>} true if the token is valid
     */
    public async pingApi(): Promise<boolean> {
        let ping = await this._request.get('/ping');
        return ping.body && ping.body.token_valid;
    }

    /**
     * OAuth2: get an access token by clientId and authorizationCode
     * @method requestOAuthAccessToken
     * @returns {Promise<boolean>}
     */
    public async requestOAuthAccessToken(clientId: string, clientSecret: string, authCode: string): Promise<boolean> {
        let payload = `grant_type=authorization_code&code=${authCode}&client_id=${clientId}&client_secret=${clientSecret}`;

        console.log(payload);

        let options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': ''+payload.length
            }
        };
        console.log(options.headers);

        let authData = await this._request.post('/oauth2/token',payload, options).body;

        console.log(authData);
        return authData;
    }


}
