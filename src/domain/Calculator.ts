// src/domain/Calculator.ts
import { CalculationRepository } from './CalculationRepository.js';


export class Calculator {
    // 1. ทำให้ repository เป็น Optional โดยใส่ ? หลังชื่อตัวแปร
    // ถ้าไม่ส่งมา ค่าจะเป็น undefined
    constructor(private repository?: CalculationRepository) { }
    /**
     * 💡 ฟังก์ชันกลางสำหรับคุมระบบ (ซ่อนไว้ใช้ส่วนตัวในคลาส - Private)
     * หน้าที่: คำนวณ, ตรวจสอบผู้ใช้, สั่งบันทึกฐานข้อมูล, คืนผลลัพธ์
     */
    private execute(
        a: number,
        b: number,
        operation: string,
        calcFn: (x: number, y: number) => number,
        userName?: string
    ): number {
        const result = calcFn(a, b);
        if (this.repository && userName) {
            this.repository.save({
                userName,
                operation,
                a,
                b,
                result,
                createdAt: new Date(),
            });
        }
        return result;
    }

    add(a: number, b: number, userName?: string): number {
        return this.execute(a, b, 'add', (x, y) => x + y, userName);
    }

    subtract(a: number, b: number, userName?: string): number {
        return this.execute(a, b, 'subtract', (x, y) => x - y, userName);
    };

    divide(a: number, b: number, userName?: string): number {
        if (b == 0) {
            throw new Error('Cannot divide by zero');
        }
        return this.execute(a, b, 'divide', (x, y) => x / y, userName);
    };

    multiply(a: number, b: number, userName?: string): number {
        return this.execute(a, b, 'multiply', (x, y) => x * y, userName);
    };

}

