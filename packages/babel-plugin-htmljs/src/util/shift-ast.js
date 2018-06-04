import traverse from "@babel/traverse";

export default function shiftAST(ast, { start, line, column }) {
  shiftNode(ast, { start, line, column });
  traverse(ast, {
    enter({ node }) {
      shiftNode(node, { start, line, column });
    },
    noScope: true
  });
  return ast;
}

function shiftNode(node, { start, line, column }) {
  node.start += start;
  node.end += start;
  node.loc.start.line += line;
  node.loc.start.column += column;
  node.loc.end.line += line;
  node.loc.end.column += node.loc.start.line === node.loc.end.line ? column : 0;
}
