import { test, expect } from "vitest";
import { tokenizer, TokenTypes } from "../src/tokenizer";

test("TokenTypes.Paren (", () => {
  const code = `(`;
  const tokens = [{ type: TokenTypes.Paren, value: "(" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("TokenTypes.Paren )", () => {
  const code = `)`;
  const tokens = [{ type: TokenTypes.Paren, value: ")" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("TokenTypes.Name add", () => {
  const code = `add`;
  const tokens = [{ type: TokenTypes.Name, value: "add" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("TokenTypes.Name subtract", () => {
  const code = `subtract`;
  const tokens = [{ type: TokenTypes.Name, value: "subtract" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("TokenTypes.Number 4", () => {
  const code = `4`;
  const tokens = [{ type: TokenTypes.Number, value: "4" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("(add 1 2)", () => {
  const code = `(add 1 2)`;
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "1" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: ")" },
  ];
  expect(tokenizer(code)).toEqual(tokens);
});

test("tokenizer", () => {
  const code = `(add 2 (subtract 4 2))`;
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: ")" }, // <<< Closing parenthesis
    { type: TokenTypes.Paren, value: ")" }, // <<< Closing parenthesis
  ];
  expect(tokenizer(code)).toEqual(tokens);
});
