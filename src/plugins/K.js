module.exports = ({types: t}) => {
  return {
    visitor: {
      CallExpression (path) {
        if (t.isCallExpression(path.node.callee) && path.node.callee.callee.name === 'K') {
          path.replaceWith(path.node.callee.arguments[0])
          return
        }

        if (path.node.callee.name !== 'K') return

        const args = path.node.arguments

        if (args.length === 1) {
          path.replaceWith(t.arrowFunctionExpression(
            [],
            args[0]
          ))
          return
        }

        path.replaceWith(args[0])
      },
      Identifier (path) {
        if (path.node.name !== 'K') return

        path.replaceWith(t.arrowFunctionExpression(
          [t.identifier('a')],
          t.arrowFunctionExpression(
            [t.identifier('b')],
            t.identifier('a')
          )
        ))
      }
    }
  }
}
