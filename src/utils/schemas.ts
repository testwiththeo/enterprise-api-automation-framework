export const checkoutResponseSchema = {
    type: 'object',
    properties: {
        order_id: {type: 'string', minLength: 1},
        status: {
            type: 'string',
            enum: ['PAID', 'PENDING', 'FAILED']
        },
    },
    required: ['order_id', 'status'],
    additionalProperties: false,
};

export const errorResponseSchema = {
    type: 'object',
    properties: {
        error: { type: 'string' },
        code: { type: 'string' }
    },
    required: ['error'],
    additionalProperties: true,
}