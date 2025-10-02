import { Column } from "typeorm";
import { numericToNumber } from "../transformers/number.transformer";

export function MoneyNumberColumn() {
  return Column({ type: "numeric", precision: 12, scale: 2, transformer: numericToNumber})
}