module.exports = ({types: t}) => {
  return {
    visitor: {
      CallExpression (path) {
        if (path.node.callee.name !== 'forEach') return

        const i = t.identifier('i')
        const [f, xs] = path.node.arguments

        path.replaceWith(t.forStatement(
          t.variableDeclaration('let', [t.variableDeclarator(i, t.numericLiteral(0))]),
          t.binaryExpression('<', i, t.memberExpression(xs, t.identifier('length'))),
          t.unaryExpression('++', i),
          t.expressionStatement(t.callExpression(f, [t.memberExpression(xs, i, true)]))
        ))
      }
    }
  }
}
