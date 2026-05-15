// src/domain/Calculation.ts
export interface Calculation {
    id?: number;            // ? = Optional
    userName: string;
    operation: string;
    a: number;
    b: number;
    result: number;
    createdAt: Date;
}