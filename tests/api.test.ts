// tests/api.test.ts
import 'dotenv/config';
import { describe, it, expect, afterAll } from '@jest/globals';
import request from 'supertest';
import { app, repo } from '../src/app.js';

describe('Calculator API (Integration Test)', () => {
    afterAll(() => {
        repo.close();
    });
    it('ควรจะรับ Request บวกเลข และตอบกับผลลัพธ์พร้อม Status 200 ได้', async () => {
        const requestBody = {
            a: 40,
            b: 10,
            operation: 'add',
            userName: 'Paa_API_Tester'
        };
        const response = await request(app)
            .post('/api/calculate')
            .send(requestBody);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('result');
        expect(response.body.userName).toEqual('Paa_API_Tester');
        expect(response.body.result).toBe(50);
    });
});