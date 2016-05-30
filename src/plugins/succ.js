module.exports = ({types: t}) => {
  return {
    visitor: {
      CallExpression (path) {
        if (path.node.callee.name !== 'succ') return
        const [arg] = path.node.arguments

        if (t.isNumericLiteral(arg)) {
          path.replaceWith(t.numericLiteral(arg.value + 1))
          return
        }
        path.replaceWith(t.parenthesizedExpression(t.binaryExpression(
          '+',
          arg,
          t.numericLiteral(1)
        )))
      },
      Identifier (path) {
        if (path.node.name !== 'succ') return
        const a = t.identifier('a')

        path.replaceWith(t.arrowFunctionExpression(
          [a],
          t.unaryExpression('++', a)
        ))
      }
    }
  }
}
