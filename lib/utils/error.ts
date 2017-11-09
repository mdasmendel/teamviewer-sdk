export class APIError {
    private status: number;
    private message: string;

    constructor(response: any) {
        this.status = response.status === 200 ? 400 : response.status;
        this.message = response.error_description || response.message || response.body && (response.body.message || response.body.error || response.body.errors);
    }
}
