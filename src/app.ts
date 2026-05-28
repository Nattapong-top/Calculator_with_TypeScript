// src/app.ts
import express from 'express';
import { Calculator } from './domain/Calculator.js';
import { SQLiteCalculationRepository } from './infrastructure/SQLiteCalculationRepository.js';

const app = express();

// 💡 เปิดระบบให้ Express อ่านข้อมูล JSON ที่ส่งมาทางอินเทอร์เน็ตได้
app.use(express.json());

// สร้างท่อเชื่อมโยงคลังข้อมูลหลังบ้านไว้ตรงกลาง
const repo = new SQLiteCalculationRepository();
const calc = new Calculator(repo);

/**
 * 🎯 ประตูที่ 1: [POST] /api/calculate (สายสั่งคำนวณทางเน็ตเวิร์ก)
 * ข้อมูลที่ต้องยิงส่งเข้ามา: { "a": 10, "b": 2, "operation": "add", "userName": "Paa" }
 * ข้อมูลที่ต้องยิงส่งเข้ามา: { "5 * 5", "userName": "Paa" }
 *
 */
app.post('/api/calculate', (req, res) => {
    try {

        let finalA: number = 0;
        let finalB: number = 0;
        let op: string = '';
        let symbol: string = '';
        let currentMode: string = '';

        const { expression, a, b, operation, userName } = req.body;

        // เช็คความปลอดภัยเบื้องต้น
        if (expression) {
            currentMode = 'V2 (Expression)';
            const match = expression.match(/^(\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*(\d+(?:\.\d+)?)$/);

            if (!match) {
                return res.status(400).json({error: 'ฟอร์แมตสมการไม่ถูกนะป๋า! ตัวอย่าง: "5*5" หรือ "10 + 10"'});
            }
            finalA = Number(match[1]);
            const operator = match[2];
            finalB = Number(match[3]);

            if (operator === '+') op = 'add';
            else if (operation === '-') op = 'subtract';
            else if (operator === '*') op = 'multiply';
            else if (operator === '/') op = 'divide';
        }
        else if (a !== undefined && b !== undefined && operation) {
            currentMode = 'V1 (Classic)';
            finalA = Number(a);
            finalB = Number(b);
            op = operation;
        }
        else {
            return res.status(400).json({ error: 'ป๋าครับ ส่งข้อมูลไม่ครบ ส่ง expression หรือ (a, b, operation) อย่างใดอย่างหนึ่งครับ' });
        }

        let result = 0;

        // ร้อยท่อส่งข้อมูลดิบเข้าสู่เครื่องยนต์หลัก (Domain Logic) ของป๋า
        if (op === 'add') {
            result = calc.add(finalA, finalB, userName);
            symbol = '+';

        } else if (op === 'sub' || op === 'subtract') {
            result = calc.subtract(finalA, finalB, userName);
            symbol = '-';

        } else if (op === 'mul' || op === 'multiply') {
            result = calc.multiply(finalA, finalB, userName);
            symbol = '*';

        } else if (op === 'div' || op === 'divide') {
            result = calc.divide(finalA, finalB, userName);
            symbol = '/';
        } else {
            return res.status(400).json({ error: 'คำสั่งไม่ถูกต้อง เลือกได้แค่ add, sub, mul, div' });
        }

        // ปัดทศนิยมให้หล่อเหลาสวยงาม 2 ตำแหน่ง
        const formattedResult = Number(result.toFixed(2));

        // ส่งผลลัพธ์ JSON ดีดกลับไปหาคนยิงเรียกใช้งาน
        return res.json({
            api_mode: currentMode,
            expression: `${finalA} ${symbol} ${finalB}`,
            result: formattedResult,
            userName: userName || 'Anonymous'
        });

    } catch (error: any) {
        // ถ้าเกิด Error (เช่น หารด้วยศูนย์) จะตะครุบแล้วส่งเลขรหัสพัง 400 กลับไปบอกทันที
        return res.status(400).json({ error: error.message });
    }
});

/**
 * 🎯 ประตูที่ 2: [GET] /api/history (สายดึงดูประวัติคลังตารางสีเขียว)
 */
app.get('/api/history', async (req, res) => {
    try {
        const history = await repo.getAll();
        return res.json(history);
    } catch (error: any) {
        return res.status(500).json({ error: 'ดึงข้อมูลประวัติพัง: ' + error.message });
    }
});

// src/app.ts

// 💡 เพิ่มประตูดักหน้าแรกสุด เพื่อความสวยงามเวลาเปิดผ่านเบราว์เซอร์
app.get('/', (req, res) => {
    res.send('<h1>🚀 ยินดีต้อนรับสู่ Paa Calculator API Server ครับป๋า!</h1><p>ลองไปที่ /api/history ดูประวัติได้เลยครับ</p>');
});

// ส่งออกท่อตัวนี้ไปให้ตัวเปิดสวิตช์ใช้งานต่อ
export { app, repo };