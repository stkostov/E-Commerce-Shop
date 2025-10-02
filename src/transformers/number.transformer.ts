import { ValueTransformer } from "typeorm";

export const numericToNumber: ValueTransformer = { to: (v: number | null) => v, from: (v: string | number | null) =>
    v == null ? v as any : typeof v === "number" ? v : parseFloat(v),
}