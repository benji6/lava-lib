module.exports = ({types: t}) => {
  return {
    visitor: {
      CallExpression (path) {
        if (path.node.callee.name !== 'I') return

        path.replaceWith(path.node.arguments[0])
      },
      Identifier (path) {
        if (path.node.name !== 'I') return

        path.replaceWith(t.arrowFunctionExpression(
          [t.identifier('a')],
          t.identifier('a')
        ))
      }
    }
  }
}
