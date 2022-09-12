export enum NodeTypes {
  Program,
  Number,
  String,
  CallExpression,
}

export interface Node {
  type: NodeTypes;
}

export interface ProgramNode extends Node {
  type: NodeTypes.Program;
  body: any[];
}

export interface NumberNode extends Node {
  type: NodeTypes.Number;
  value: string;
}

export interface StringNode extends Node {
  type: NodeTypes.String;
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
    type: NodeTypes.Number,
    value,
  };
}

export function createStringNode(value: string): StringNode {
  return {
    type: NodeTypes.String,
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
