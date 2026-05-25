// src/cli.ts
import { Calculator } from './domain/Calculator.js';
import { SQLiteCalculationRepository } from './infrastructure/SQLiteCalculationRepository.js';

export function runCLI(args: string[]): string {
    try {
        let operation = '';
        let a = 0;
        let b = 0;
        let userName = 'Anonymous';
        let symbol = '';

        const repo = new SQLiteCalculationRepository();
        const calc = new Calculator(repo);
        let result = 0;

        // 💡 [ตรวจสอบเวอร์ชันการพิมพ์]
        // ถ้าป๋าส่งพารามิเตอร์มามากกว่า 2 ตัว แปลว่าเป็นเวอร์ชันเก่า (โหมดแยกช่อง: add 20 30 Paa)
        if (args.length >= 3) {
            operation = args[0];
            a = Number(args[1]);
            b = Number(args[2]);
            userName = args[3] || 'Anonymous';

            if (operation === 'add') {
                result = calc.add(a, b, userName);
                symbol = '+';
            } else if (operation === 'sub' || operation === 'subtract') {
                result = calc.subtract(a, b, userName);
                symbol = '-';
            } else if (operation === 'mul' || operation === 'multiply') {
                result = calc.multiply(a, b, userName);
                symbol = '*';
            } else if (operation === 'div' || operation === 'divide') {
                result = calc.divide(a, b, userName);
                symbol = '/';
            } else {
                return '❌ คำสั่งไม่ถูกต้องนะป๋า! เลือกได้แค่ add, sub, mul, div';
            }

        } else {
            // 💡 เวอร์ชัน 2: โหมดสมการทางลัด (เช่น "10 + 10" Paa)
            const inputExpression = args[0];
            userName = args[1] || 'Anonymous';

            if (!inputExpression) {
                return '❌ ป๋าครับ รบกวนระบุสมการคณิตศาสตร์ด้วยครับ';
            }

            // Regex แกะรอยช่องว่างและเครื่องหมาย
            const match = inputExpression.match(/^(\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*(\d+(?:\.\d+)?)$/);

            if (!match) {
                return '❌ ฟอร์แมตสมการไม่ถูกนะป๋า! ตัวอย่าง: "1+1" หรือ "10 + 10"';
            }

            a = Number(match[1]);
            const operator = match[2];
            b = Number(match[3]);

            if (operator === '+') {
                result = calc.add(a, b, userName);
                symbol = '+';
            } else if (operator === '-') {
                result = calc.subtract(a, b, userName);
                symbol = '-';
            } else if (operator === '*') {
                result = calc.multiply(a, b, userName);
                symbol = '*';
            } else if (operator === '/') {
                result = calc.divide(a, b, userName);
                symbol = '/';
            }
        }

        // จัดฟอร์แมตทศนิยมและส่งค่ากลับสวยๆ เหมือนกันทั้งสองเวอร์ชัน
        const formattedResult = Number(Number(result).toFixed(2));
        return `ผลลัพธ์ของ ${userName}: ${a} ${symbol} ${b} = ${formattedResult}`;

    } catch (error: any) {
        return `❌ เกิดข้อผิดพลาด: ${error.message}`;
    }
}