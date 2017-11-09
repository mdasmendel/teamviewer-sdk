import {APIError} from ".";
import {RequestOptions} from "../interfaces";

const merge = require('lodash.merge'),
    popsicle = require('popsicle'),
    popsicleStatus = require('popsicle-status'),
    urljoin = require('url-join');

export class TvRequest {

    private _accessToken: string;
    private _url: string;
    private _headers: any;
    private _queryParams: any;

    constructor(options: RequestOptions) {
        this._url = `https://${options.apiBaseUrl}/api/${options.apiVersion}`;
        this._headers = options.headers || {};
        this._queryParams = options.query || {};
    }

    async request(method: string, url: string, options: RequestOptions): Promise<any> {

        let request = merge({
            method: method,
            url: urljoin(this._url, url),
            headers: this._headers,
            query: this._queryParams
        }, options);
        // console.log(request)

        return popsicle.request(request)
            .use(popsicleStatus())
            .use(popsicle.plugins.parse('json'))
            .then((response: any) => {
            // console.log(response)
                if (response.body && response.body.errors)
                    throw new APIError(response);
                else
                    return response
            })
            .catch((error: any) => {
                if (error.code === 'EINVALIDSTATUS' && error.res) {
                    throw new APIError(error.res.body);
                } else if (error instanceof Error) {
                  throw error;
                } else {
                    throw new APIError(error);
                }
            });
    }

    async query(method: string, url: string, params: any, options: RequestOptions): Promise<any> {
        return this.request(method, url, merge({query: params}, options));
    }

    command(method: string, url: string, data: any, options: RequestOptions) {
        return this.request(method, url, merge({
            body: data,
            headers: {'Content-Type': 'application/json'}
        }, options));
    }

    get(url: string, params: any, options: RequestOptions) {
        return this.query('get', url, params, options);
    }

    //
    // head(url, params, options) {
    //     return this.query('head', url, params, options);
    // }
    //
    // options(url, params, options) {
    //     return this.query('options', url, params, options);
    // }
    //
    post(url: string, data: any, options: RequestOptions) {
        return this.command('post', url, data, options);
    }

    //
    // postMulti(url, data) {
    //     let formData = popsicle.form();
    //     let options = {
    //         headers: {'Content-Type': null}
    //     };
    //
    //     Object.keys(data).forEach(function(key) {
    //         if (Array.isArray(data[key])) {
    //             data[key].forEach(function(item) {
    //                 formData.append(key, item);
    //             });
    //         } else {
    //             formData.append(key, data[key]);
    //         }
    //     });
    //
    //     return this.command('post', url, formData, options);
    // }
    //
    put(url: string, data: any, options: RequestOptions) {
        return this.command('put', url, data, options);
    }

    //
    // patch(url, data, options) {
    //     return this.command('patch', url, data, options);
    // }
    //
    // delete(url, data, options) {
    //     return this.command('delete', url, data, options);
    // }
}

// module.exports = TvRequest;
