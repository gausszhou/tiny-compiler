export enum NodeTypes {
  Program = "Program",
  NumberLiteral = "NumberLiteral",
  StringLiteral = "StringLiteral",
  CallExpression = "CallExpression",
  ExpressionStatement = "ExpressionStatement",
  Identifier = "Identifier"
}

export interface Node {
  type: NodeTypes;
}

export interface ProgramNode extends Node {
  type: NodeTypes.Program;
  body: any[];
  context?: ChildNode[];
}

export interface NumberNode extends Node {
  type: NodeTypes.NumberLiteral;
  value: string;
}

export interface StringNode extends Node {
  type: NodeTypes.StringLiteral;
  value: string;
}
export interface CallExpressionNode extends Node {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[];
  context?: ChildNode[];
}

export type ChildNode = NumberNode | StringNode | CallExpressionNode;

export function createProgramNode(): ProgramNode {
  return {
    type: NodeTypes.Program,
    body: [],
  };
}

export function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.NumberLiteral,
    value,
  };
}

export function createStringNode(value: string): StringNode {
  return {
    type: NodeTypes.StringLiteral,
    value,
  };
}

export function createCallExpression(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: [],
  };
}
