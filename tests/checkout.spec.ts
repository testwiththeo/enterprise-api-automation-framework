import { test, expect } from '@playwright/test';
import { AuthApi } from '../src/api/auth.api';
import { CheckoutApi } from '../src/api/checkout.api';
import * as fs from 'fs';
import * as path from 'path';
import Ajv from 'ajv';
import { checkoutResponseSchema, errorResponseSchema } from '../src/utils/schemas';

const ajv = new Ajv();

// Load data dari JSON file
const testData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/checkout-data.json'), 'utf8'));

test.describe('Checkout API Data-Driven Suite', () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    const authApi = new AuthApi(request);
    token = await authApi.login('user@mail.com', 'password123');
  });

  for (const data of testData) {
    test(`Scenario: ${data.scenario}`, async ({ request }) => {
      const checkoutApi = new CheckoutApi(request);
      const response = await checkoutApi.createOrder(token, data.product_id, data.amount);
      
      expect(response.status()).toBe(data.expectedStatus);
      
      const body = await response.json();
      if (data.expectedStatus === 200) {
        const validate = ajv.compile(checkoutResponseSchema);
        const valid = validate(body);
        expect(valid, `Schema Validation Error: ${ajv.errorsText(validate.errors)}`).toBe(true);

        expect(body.status).toBe(data.expectedMessage);
      } else {
        const validate = ajv.compile(errorResponseSchema);
        const valid = validate(body);
        expect(valid, `Error Schema Validation Error: ${ajv.errorsText(validate.errors)}`).toBe(true);

        expect(body.error.toLowerCase()).toContain(data.expectedMessage.toLowerCase());
      }
    });
  }
});