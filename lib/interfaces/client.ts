import {TVSessionClassInterface, TVUserClassInterface, TVAccountClassInterface, TVGroupClassInterface} from ".";


export interface TVClientInterface {
    pingApi(accessToken: string): Promise<boolean>,
    requestOAuthAccessToken(clientId: string, clientSecret: string, authCode: string): Promise<boolean>,
    user: TVUserClassInterface,
    session: TVSessionClassInterface,
    account: TVAccountClassInterface,
    group: TVGroupClassInterface,
}