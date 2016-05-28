module.exports = ({types: t}) => {
  return {
    visitor: {
      CallExpression (path) {
        if (path.node.callee.name !== 'K') return

        path.replaceWith(t.arrowFunctionExpression(
          [],
          path.node.arguments[0]
        ))
      }
    }
  }
}
