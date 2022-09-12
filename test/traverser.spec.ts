import { test, expect } from "vitest";
import { NodeTypes, ProgramNode } from "./../src/ast";
import { traverser, Visitor } from "../src/traverser";

test("traverse", () => {
  const ast: ProgramNode = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.CallExpression,
            name: "subtract",
            params: [
              {
                type: NodeTypes.NumberLiteral,
                value: "4",
              },
              {
                type: NodeTypes.NumberLiteral,
                value: "2",
              },
            ],
          },
        ],
      },
    ],
  };
  const callCounts: Array<string | NodeTypes>[] = [];
  const visitor: Visitor = {
    Program: {
      enter(node) {
        callCounts.push(["program-enter", node.type, ""]);
      },
      exit(node) {
        callCounts.push(["program-exit", node.type, ""]);
      },
    },

    CallExpression: {
      enter(node, parent) {
        callCounts.push(["callExpression-enter", node.type, parent!.type]);
      },
      exit(node, parent) {
        callCounts.push(["callExpression-exit", node.type, parent!.type]);
      },
    },

    NumberLiteral: {
      enter(node, parent) {
        callCounts.push(["numberLiteral-enter", node.type, parent!.type]);
      },
      exit(node, parent) {
        callCounts.push(["numberLiteral-exit", node.type, parent!.type]);
      },
    },
  };
  traverser(ast, visitor);
  const arr = [
    "program-enter",
    "callExpression-enter",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "callExpression-enter",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "callExpression-exit",
    "callExpression-exit",
    "program-exit",
  ];
  const callArr = callCounts.map((item) => item[0]);
  expect(callArr).toEqual(arr);
});
