import { test, expect } from "vitest";
import { NodeTypes } from "../src/ast";
import { parser } from "../src/parser";
import { TokenTypes } from "./../src/tokenizer";

test("number", () => {
  const tokens = [{ type: TokenTypes.Number, value: "2" }];

  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.Number,
        value: "2",
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});

test("name", () => {
  const tokens = [{ type: TokenTypes.Name, value: "hello" }];

  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.String,
        value: "hello",
      },
    ],
  };
  expect(parser(tokens)).toEqual(ast);
});

test("call expression (add 1 2);(add 3 4)", () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "1" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "3" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Paren, value: ")" },
  ];
  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.Number,
            value: "1",
          },
          {
            type: NodeTypes.Number,
            value: "2",
          },
        ],
      },
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.Number,
            value: "3",
          },
          {
            type: NodeTypes.Number,
            value: "4",
          },
        ],
      },
    ],
  };
  expect(parser(tokens)).toEqual(ast);
});

test("parser tokens to ast", () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: ")" },
  ];
  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.Number,
            value: "2",
          },
          {
            type: NodeTypes.CallExpression,
            name: "subtract",
            params: [
              {
                type: NodeTypes.Number,
                value: "4",
              },
              {
                type: NodeTypes.Number,
                value: "2",
              },
            ],
          },
        ],
      },
    ],
  };
  expect(parser(tokens)).toEqual(ast);
});
