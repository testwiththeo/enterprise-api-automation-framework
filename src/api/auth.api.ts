import { APIRequestContext, expect } from "@playwright/test";

export class AuthApi {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async login(email: string, password: string) {
        const response = await this.request.post('/api/v1/auth/login', {
            data: { email, password },
        });

        expect(response.ok()).toBeTruthy(); // Ensure the response is successful (status code 200-299)
        const body = await response.json();
        return body.access_token; // Return the access token for further use
    }
}
