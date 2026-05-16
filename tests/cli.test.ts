import 'dotenv/config';
import { describe, it, expect } from '@jest/globals';

import {runCLI} from "../src/cli.js";

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