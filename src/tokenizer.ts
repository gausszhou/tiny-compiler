export enum TokenTypes {
  Paren,
  Name,
  Number
}

export interface Token {
  type: TokenTypes;
  value: string;
}

export function tokenizer(code: string) {
  const tokens: Token[] = [];
  let current = 0;
 
  const LETTERS = /[a-z]/i;
  const NUMBERS = /\d/;
  const SPACE  = /\s/ 
  while (current < code.length) {
    let char = code[current];
    // " "
    if(SPACE.test(char)){
      current++
      continue
    }
    // ( )
    if (char === "(" || char === ")") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++
      continue
    }
    // add subtract
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.Name,
        value: value,
      });
      continue
    }
    // 4 2
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.Number,
        value: value,
      });
    }
  
  }
  return tokens;
}
