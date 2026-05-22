import { SQLiteCalculationRepository} from "./infrastructure/SQLiteCalculationRepository.js";
import {Calculator} from "./domain/Calculator.js";

export function runCLI(args: string[]) : string {
    try {
        const [operation, aStr, bStr, userName] = args;
        const a = Number(aStr);
        const b = Number(bStr);
        const repo = new SQLiteCalculationRepository();
        const calc = new Calculator(repo)

        let result: number = 0;
        let symbol: string = "";

        if (operation === 'add') {
            result = calc.add(a, b, userName);
            symbol = '+'
        } else if (operation === 'sub' || operation === 'subtract') {
            result = calc.subtract(a, b, userName);
            symbol = '-'
        } else if (operation === 'divide') {
            result = calc.divide(a, b, userName);
            symbol = '/'
        } else if (operation == 'multiply') {
            result = calc.multiply(a, b, userName);
            symbol = '*'
        }
        const formattedResult = Number(Number(result).toFixed(2));
        return `ผลลัพธ์ของ ${userName}: ${a} ${symbol} ${b} = ${formattedResult}`;
    } catch (error: any) {
        return `เกิดข้อผิดพลาด: ${error.message}`;
    }
}