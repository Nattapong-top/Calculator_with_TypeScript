// src/app.ts
import express from 'express';
import { Calculator} from "./domain/Calculator.js";
import { SQLiteCalculationRepository} from "./infrastructure/SQLiteCalculationRepository.js";

export const app = express();
app.use(express.json());
export const repo = new SQLiteCalculationRepository();
const calc = new Calculator(repo);

app.post('/api/calculate', async (req, res) => {
    try {
        const { a, b, operation, userName } = req.body;
        let result = 0;

        if (operation === "add") result = calc.add(a, b, userName);
        else if (operation === "subtract") result = calc.subtract(a, b, userName);
        else if (operation === 'divide') result = calc.divide(a, b, userName);
        else if (operation === 'multiply') result = calc.multiply(a, b, userName);
        else {
            res.status(400).json({error: 'Invalid operation' });
            return;
        }
        res.json({
            result,
            userName,
            operation,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

app.get('api/calculations', async (req, res) => {
    const history = await repo.getAll();
    res.json(history);
});