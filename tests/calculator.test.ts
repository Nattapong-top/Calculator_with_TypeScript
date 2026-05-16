import 'dotenv/config';
import { jest, describe, it, expect } from '@jest/globals';
import { Calculator } from "../src/domain/Calculator.js";

describe('Calculator', () => {
    it('ควรบวกเลข 5 และ 10 ได้ผลลัพธ์เป็น 15', () => {
        const calc = new Calculator();
        expect(calc.add(5, 10)).toBe(15);
    });

    it('ควรลบเลข 20 ด้วย 7 แล้วได้ผลลัพธ์เป็น 13', () => {
        const calc = new Calculator();
        expect(calc.subtract(20, 7)).toBe(13);
    });

    it('ควรหารเลข 100 ด้วย 5 แล้วได้ผลลัพธ์เป็น 20', () => {
        const calc = new Calculator();
        expect(calc.divide(100, 5)).toBe(20)
    });

    it('ควรคูณเลข 20 ด้วย 5 แล้วได้ผลลัพธ์เป็น 100', () => {
        const calc = new Calculator();
        expect(calc.multiply(20, 5)).toBe(100)

    });

    it('ควรจะโยน Error ออกมาเมื่อมีการหารด้วยเลข 0', () => {
        const calc = new Calculator();
        expect(() => calc.divide(10, 0)).toThrow('Cannot divide by zero');
    })
});

describe('Calculator with Persistence (New Feature)', () => {
    it('ควรส่งข้อมูลการคำนวณและชื่อ Paa TopIT ไปที่ Repository', async () => {
        // สร้าง Mock Repository
        const mockRepo = {
            save: jest.fn().mockImplementation(() => Promise.resolve()),
            getAll: jest.fn()
        } as any;

        const calc = new Calculator(mockRepo);
        const userName = 'Paa TopIT';

        const result = calc.add(100, 111, userName);

        expect(result).toBe(211);

        // ตรวจสอบ mockRepo ถูกเรียกใช้งานจริง
        expect(mockRepo.save).toHaveBeenCalledWith(
            expect.objectContaining({
                userName: userName,
                operation: 'add',
                result: 211
            })
        );
    })
});

// อย่าลืม import ตัวจริงเข้ามาด้านบนด้วยนะครับป๋า
import { SQLiteCalculationRepository } from '../src/infrastructure/SQLiteCalculationRepository.js';

describe('Calculator with Real Database (Integration Test)', () => {
    it('ควรจะบันทึกข้อมูลลง SQLite จริงและดึงกลับมาได้ถูกต้อง', async () => {
        // 1. Arrange: ใช้ Repository ตัวจริงที่ต่อกับ SQLite
        const realRepo = new SQLiteCalculationRepository();
        const calc = new Calculator(realRepo);
        const uniqueUser = `Paa_Test_${Date.now()}`; // ตั้งชื่อให้ไม่ซ้ำกันในแต่ละรอบที่รัน

        // 2. Act: สั่งคำนวณและบันทึกผ่านระบบจริง
        const result = calc.add(10, 20, uniqueUser);
        expect(result).toBe(30);

        // 3. Assert: ไปกวาดข้อมูลจาก DB จริง ๆ ออกมาดูว่ามีไอ้คนนี้อยู่ไหม
        const history = await realRepo.getAll();

        // ค้นหาว่าในประวัติที่ดึงมาจาก DB มีชื่อ uniqueUser ที่เราเพิ่งเซฟไปเมื่อกี้ไหม
        const savedRecord = history.find(record => record.userName === uniqueUser);

        // ตรวจสอบความถูกต้องของข้อมูลในฐานข้อมูลจริง
        expect(savedRecord).toBeDefined(); // ต้องเจอข้อมูล (ไม่เป็น undefined)
        expect(savedRecord?.operation).toBe('add');
        expect(savedRecord?.result).toBe(30);
    });
});