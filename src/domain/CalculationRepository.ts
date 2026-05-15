// src/domain/CalculationRepository.ts

import { Calculation } from './Calculation';

export interface CalculationRepository {
    save(calculation: Calculation): Promise<void>;
    getAll(): Promise<Calculation[]>;
}
