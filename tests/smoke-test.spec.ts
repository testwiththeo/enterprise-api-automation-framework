import { test, expect } from "@playwright/test";
import { AuthApi } from "../src/api/auth.api";
import { CheckoutApi } from "../src/api/checkout.api";

test.describe('E-commerce Checkout Flow', () => {
    
    test('Should sucessfully checkout with valid token and balance', async ({ request}) => {
        // Initialize Wrappers for API Endpoints
        const authApi = new AuthApi(request);
        const checkoutApi = new CheckoutApi(request);

        // Execute Login to get Acess Token
        const token = await authApi.login('user@mail.com', 'password123');
        console.log(`Token obtained: ${token}`);

        // Execute Checkout
        const response = await checkoutApi.createOrder(token, 'PROD-001', 10000000);

        // Validate Response
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.status).toBe('PAID');
    });
});