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