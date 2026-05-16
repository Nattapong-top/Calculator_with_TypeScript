import 'dotenv/config';
import Database from 'better-sqlite3';
import { CalculationRepository } from '../domain/CalculationRepository.js';
import { Calculation } from '../domain/Calculation.js';

export class SQLiteCalculationRepository implements CalculationRepository {

    private db = new Database(
        process.env.DATABASE_PATH || 'database/calculator.db'
    );

    constructor() {

        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS calculations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userName TEXT NOT NULL,
                operation TEXT NOT NULL,
                a REAL NOT NULL,
                b REAL NOT NULL,
                result REAL NOT NULL,
                createdAt TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `).run();
    }

    async save(calculation: Calculation): Promise<void> {

        const stmt = this.db.prepare(`
            INSERT INTO calculations
            (
                userName,
                operation,
                a,
                b,
                result
            )
            VALUES (?, ?, ?, ?, ?)
        `);

        stmt.run(
            calculation.userName,
            calculation.operation,
            calculation.a,
            calculation.b,
            calculation.result
        );
    }

    async getAll(): Promise<Calculation[]> {

        const stmt = this.db.prepare(`
            SELECT *
            FROM calculations
            ORDER BY createdAt DESC
        `);

        return stmt.all() as Calculation[];
    }
}