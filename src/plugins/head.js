module.exports = ({types: t}) => {
  return {
    visitor: {
      CallExpression (path) {
        if (path.node.callee.name !== 'head') return
        const [arg] = path.node.arguments

        if (t.isArrayExpression(arg)) {
          path.replaceWith(arg.elements[0])
          return
        }

        path.replaceWith(t.memberExpression(
          arg,
          t.numericLiteral(0),
          true
        ))
      },
      Identifier (path) {
        if (path.node.name !== 'head') return
        const xs = t.identifier('xs')

        path.replaceWith(t.arrowFunctionExpression(
          [xs],
          t.memberExpression(
            xs,
            t.numericLiteral(0),
            true
          )
        ))
      }
    }
  }
}
