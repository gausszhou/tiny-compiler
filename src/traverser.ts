import { ProgramNode, NodeTypes, ChildNode, CallExpressionNode } from "./ast";

export type ParentNode = ProgramNode | CallExpressionNode;

type methodFn = (node: ChildNode | ProgramNode, parent: ParentNode) => void;

interface vistorOption {
  enter: methodFn;
  exit?: methodFn;
}

export interface Visitor {
  Program?: vistorOption;
  NumberLiteral?: vistorOption;
  StringLiteral?: vistorOption;
  CallExpression?: vistorOption;
}

export function traverser(rootNode: ProgramNode, visitor: Visitor) {
  // 1. 递归实现 BFS遍历
  // 2. 每个节点 调用 visitor

  function traverseArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverseNode(node, parent);
    });
  }

  function traverseNode(node: ChildNode | ProgramNode, parent: ParentNode) {
    const methods = visitor[node.type];
    if (methods) {
      methods?.enter(node, parent);
    }
    switch (node.type) {
      case NodeTypes.NumberLiteral:
        break;
      case NodeTypes.CallExpression:
        traverseArray(node.params, node);
        break;
      case NodeTypes.Program:
        traverseArray(node.body, node);
        break;
    }
    if (methods && methods.exit) {
      methods?.exit(node, parent);
    }
  }
  traverseNode(rootNode, rootNode);
}
