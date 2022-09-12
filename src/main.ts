import { tokenizer } from "./tokenizer";
import { parser } from "./parser";
import { transformer } from "./transformer";
import { codegen } from "./codegen";

export function compiler(code: string): string | void {
  const tokens = tokenizer(code);
  const ast = parser(tokens);
  const transformedAST = transformer(ast);
  const result = codegen(transformedAST);
  return result;
}
