import { test,expect } from "vitest";
import { compiler } from "../src/main";

test("compiler",()=>{
  const code = "(add 2 (subtract 4 2))";
  const result = "add(2, subtract(4, 2));"
  expect(compiler(code)).toEqual(result)
})