import { Token, TokenTypes } from "./tokenizer";
import {
  createProgramNode,
  createNumberNode,
  createStringNode,
  createCallExpression,
} from "./ast";

export function parser(tokens: Token[]) {
  let current = 0;
  const rootNode = createProgramNode();

  function walk() {
    let token = tokens[current];

    // number
    if (token.type === TokenTypes.Number) {
      current++;
      return createNumberNode(token.value);
    }
    // name
    if (token.type === TokenTypes.Name) {
      current++;
      return createStringNode(token.value);
    }
    // callExpression start
    if (token.type === TokenTypes.Paren && token.value === "(") {
      token = tokens[++current];
      const node = createCallExpression(token.value);
      token = tokens[++current];
      while (!(token.type === TokenTypes.Paren && token.value === ")")) {
          node.params.push(walk());
          token = tokens[current]; // <<--
      }
      current++; // skip )
      return node;
    }
    // undefined
    throw new Error(`invalid ${token}`)
  }
  while(current < tokens.length){
    rootNode.body.push(walk());
  }
  return rootNode;
}
