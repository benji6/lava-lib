module.exports = ({types: t}) => {
  return {
    visitor: {
      CallExpression (path) {
        if (path.node.callee.name !== 'last') return
        const [arg] = path.node.arguments

        if (t.isArrayExpression(arg)) {
          path.replaceWith(arg.elements[arg.elements.length - 1])
          return
        }

        path.replaceWith(t.memberExpression(
          arg,
          t.binaryExpression(
            '-',
            t.memberExpression(arg, t.identifier('length')),
            t.numericLiteral(1)
          ),
          true
        ))
      },
      Identifier (path) {
        if (path.node.name !== 'last') return
        const xs = t.identifier('xs')

        path.replaceWith(t.arrowFunctionExpression(
          [xs],
          t.memberExpression(
            xs,
            t.binaryExpression(
              '-',
              t.memberExpression(xs, t.identifier('length')),
              t.numericLiteral(1)
            ),
            true
          )
        ))
      }
    }
  }
}
