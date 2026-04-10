import { APIRequestContext } from '@playwright/test';

export class CheckoutApi {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createOrder(token: string, product_id: string, amount: number) {
        return await this.request.post('/api/v1/checkout', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                product_id: product_id,
                amount: amount,
                payment_method: 'wallet'
            }
        })
    }
}