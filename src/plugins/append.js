const charCodeA = 97

module.exports = ({types: t}) => {
  const concat = t.identifier('concat')

  return {
    visitor: {
      CallExpression (path) {
        if (path.node.callee.name !== 'append') return

        const args = path.node.arguments
        const argNames = args.map(x => x.name)

        let charCode = charCodeA
        let char;
        while (argNames.includes(char = String.fromCharCode(charCode))) charCode++

        if (args.length === 1) {
          path.replaceWith(t.arrowFunctionExpression(
            [t.identifier(char)],
            t.callExpression(
              t.memberExpression(t.identifier(char), concat),
              [t.arrayExpression(args)]
            )
          ))
          return
        }

        path.replaceWith(t.callExpression(
          t.memberExpression(args[1], concat),
          [t.arrayExpression([args[0]])]
        ))
      },
      Identifier (path) {
        if (path.node.name !== 'append') return

        const x = t.identifier('x')
        const xs = t.identifier('xs')

        path.replaceWith(t.arrowFunctionExpression(
          [x],
          t.arrowFunctionExpression(
            [xs],
            t.callExpression(
              t.memberExpression(xs, concat),
              [t.arrayExpression([x])]
            )
          )
        ))
      }
    }
  }
}
