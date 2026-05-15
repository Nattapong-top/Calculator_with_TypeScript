// src/domain/Calculator.ts
import { CalculationRepository } from './CalculationRepository';


export class Calculator {
    // 1. ทำให้ repository เป็น Optional โดยใส่ ? หลังชื่อตัวแปร
    // ถ้าไม่ส่งมา ค่าจะเป็น undefined
    constructor(private repository?: CalculationRepository) { }

    add(a: number, b: number, userName?: string): number {
        const result = a + b;

        // 3. เช็คว่าถ้ามีทั้ง repository และ userName ถึงจะทำการบันทึก
        // นี่คือการป้องกันไม่ให้เทสเก่าพัง เพราะเทสเก่าไม่มีสองอย่างนี้
        if (this.repository && userName) {
            this.repository.save({
                userName,
                operation: 'add',
                a,
                b,
                result,
                createdAt: new Date()
            });
        }
        return result;
    }

    subtract(a: number, b: number): number {
        return a - b;
    };

    divide(a: number, b: number): number {
        if (b == 0) {
            throw new Error('Cannot divide by zero');
        }
        return a / b;
    };

    multiply(a: number, b: number): number {
        return a * b;
    };

}

