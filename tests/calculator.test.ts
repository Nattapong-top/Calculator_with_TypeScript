import { jest, describe, it, expect } from '@jest/globals';
import { Calculator } from "../src/domain/Calculator";

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
});