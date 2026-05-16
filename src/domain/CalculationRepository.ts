// src/domain/CalculationRepository.ts

import { Calculation } from './Calculation.js';

export interface CalculationRepository {
    save(calculation: Calculation): Promise<void>;
    getAll(): Promise<Calculation[]>;
}
