import 'dotenv/config';
import { describe, it, expect, beforeAll, afterAll, } from '@jest/globals';

import {runCLI} from "../src/cli.js";
import {SQLiteCalculationRepository} from "../src/infrastructure/SQLiteCalculationRepository.js";

describe('Calculator CLI', () => {
    it('ควรจะรับค่าจาก command line แล้วคำนวณ บวก ส่งชื่อ ได้ถูกต้อง', () => {
        const mockArgs = ['add', '10', '20', 'Paa TopIT'];
        const result = runCLI(mockArgs);
        expect(result).toBe('ผลลัพธ์ของ Paa TopIT: 10 + 20 = 30');
    });
    it('ควรจะรับค่าจาก command line แล้วคำนวณ ลบ ส่งชื่อ ได้ถูกต้อง', () => {
        const mockArgs = ['sub', '20', '10', 'pee TopIT'];
        const result = runCLI(mockArgs);
        expect(result).toBe('ผลลัพธ์ของ pee TopIT: 20 - 10 = 10');
    });
    it('ควรจะรับค่าจาก command line แล้วคำนวณ หาร ส่งชื่อ ได้ถูกต้อง', () => {
        const mockArgs = ['divide', '100', '20', 'TopIT'];
        const result = runCLI(mockArgs);
        expect(result).toBe('ผลลัพธ์ของ TopIT: 100 / 20 = 5');
    });
    it('ควรจะรับค่าจาก command line แล้วคำนวณ คูณ ส่งชื่อ ได้ถูกต้อง', () => {
        const mockArgs = ['multiply', '5', '20', 'TopIT'];
        const result = runCLI(mockArgs);
        expect(result).toBe('ผลลัพธ์ของ TopIT: 5 * 20 = 100');
    });
});

describe('CLI Integration Tests (บวก ลบ คูณ หาร ป้องกัน error และ บันทึกลง db', () => {
    let repo: SQLiteCalculationRepository;
    // ก่อนเริ่มเทสทั้งหมด ให้สร้างท่อต่อฐานข้อมูลเตรียมไว้สำหรับ "แอบดู" ผลลัพธ์
    beforeAll(() => {
        repo = new SQLiteCalculationRepository();
    });
    // เทสเสร็จแล้ว ให้ปิดท่อให้เรียบร้อย
    afterAll(() => {
        repo.close();
    });

    it('คำนวณ บวก และบันทึกประวัติลง SQLite ได้จริง', async () => {
        const userName = 'Paa Test Add';

        const output = runCLI(['add', '49', '51', userName]);

        expect(output).toBe('ผลลัพธ์ของ Paa Test Add: 49 + 51 = 100');

        const history = await repo.getAll();
        const latestRecord = history.find(h => h.userName === userName);

        expect(latestRecord).toBeDefined();
        expect(latestRecord?.operation).toBe('add');
        expect(latestRecord?.result).toBe(100);
    });

    it('ควรคำนวณ ลบ และบันทึกประวัติลง SQLite ได้จริง', async () => {
        const userName = 'Paa Test Subtract';
        const output = runCLI(['sub', '49', '51', userName]);

        expect(output).toBe('ผลลัพธ์ของ Paa Test Subtract: 49 - 51 = -2');
        const history = await repo.getAll();
        const latestRecord = history.find(h => h.userName === userName);

        expect(latestRecord).toBeDefined();
        expect(latestRecord?.operation).toBe('subtract');
        expect(latestRecord?.result).toBe(-2);
    });

    it('ควรคำนวณ คูณ และบันทึกประวัติลง SQLite ได้จริง', async () => {
        const userName = 'Paa Test Multiply';
        const output = runCLI(['multiply', '49', '51', userName]);

        expect(output).toBe("ผลลัพธ์ของ Paa Test Multiply: 49 * 51 = 2499");
        const history = await repo.getAll();
        const latestRecord = history.find(h => h.userName === userName);

        expect(latestRecord).toBeDefined();
        expect(latestRecord?.operation).toBe('multiply');
        expect(latestRecord?.result).toBe(2499)
    });

    it('ควรคำนวณ หาร และบันทึกประวัติลง SQLite ได้จริง', async () => {
        const userName = 'Paa Test Divide';
        const output = runCLI(['divide', '49', '9', userName]);

        expect(output).toBe('ผลลัพธ์ของ Paa Test Divide: 49 / 9 = 5.44');
        const history = await repo.getAll();
        const latestRecord = history.find(h => h.userName === userName);

        expect(latestRecord).toBeDefined();
        expect(latestRecord?.operation).toBe('divide');
        expect(latestRecord?.result).toBe(5.44);
    });

    it('ควรแจ้งเตือนข้อความ Error เมื่อใส่ตัวหารเป็นเลข 0', async () => {
        const userName = "Paa Test Divide by Zero";
        const output = runCLI(['divide', '49', '0', userName]);

        expect(output).toBe('เกิดข้อผิดพลาด: Cannot divide by zero');

        const history = await repo.getAll();
        const latestRecord = history.find(h => h.userName === userName);
        expect(latestRecord).toBeUndefined();
    })
})