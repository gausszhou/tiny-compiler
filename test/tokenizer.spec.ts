import { test, expect } from "vitest";
import { tokenizer, TokenType } from "../src/tokenizer";

test("TokenType.Paren (", () => {
  const code = `(`;
  const tokens = [{ type: TokenType.Paren, value: "(" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("TokenType.Paren )", () => {
  const code = `)`;
  const tokens = [{ type: TokenType.Paren, value: ")" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("TokenType.Name add", () => {
  const code = `add`;
  const tokens = [{ type: TokenType.Name, value: "add" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("TokenType.Name subtract", () => {
  const code = `subtract`;
  const tokens = [{ type: TokenType.Name, value: "subtract" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("TokenType.Number 4", () => {
  const code = `4`;
  const tokens = [{ type: TokenType.Number, value: "4" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("(add 1 2)", () => {
  const code = `(add 1 2)`;
  const tokens = [
    { type: TokenType.Paren, value: "(" },
    { type: TokenType.Name, value: "add" },
    { type: TokenType.Number, value: "1" },
    { type: TokenType.Number, value: "2" },
    { type: TokenType.Paren, value: ")" },
  ];
  expect(tokenizer(code)).toEqual(tokens);
});

test("tokenizer", () => {
  const code = `(add 2 (subtract 4 2))`;
  const tokens = [
    { type: TokenType.Paren, value: "(" },
    { type: TokenType.Name, value: "add" },
    { type: TokenType.Number, value: "2" },
    { type: TokenType.Paren, value: "(" },
    { type: TokenType.Name, value: "subtract" },
    { type: TokenType.Number, value: "4" },
    { type: TokenType.Number, value: "2" },
    { type: TokenType.Paren, value: ")" }, // <<< Closing parenthesis
    { type: TokenType.Paren, value: ")" }, // <<< Closing parenthesis
  ];
  expect(tokenizer(code)).toEqual(tokens);
});
