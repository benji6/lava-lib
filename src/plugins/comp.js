const charCodeA = 97

module.exports = ({types: t}) => {
  return {
    visitor: {
      CallExpression (path) {
        if (t.isCallExpression(path.node.callee) && path.node.callee.callee.name === 'comp') {
          path.replaceWith(path.node.callee.arguments
              .reduceRight((acc, arg) => t.callExpression(arg, [acc]), path.node.arguments[0]))
          return
        }

        if (path.node.callee.name !== 'comp') return

        const args = path.node.arguments
        const argNames = args.map(x => x.name)

        let charCode = charCodeA
        let char;
        while (argNames.includes(char = String.fromCharCode(charCode))) charCode++

        path.replaceWith(t.arrowFunctionExpression(
          [t.identifier(char)],
          args.reduceRight((acc, arg) => t.callExpression(arg, [acc]), t.identifier(char))
        ))
      },
      Identifier (path) {
        if (path.node.name !== 'comp') return

        const acc = t.identifier('acc')
        const f = t.identifier('f')
        const fs = t.identifier('fs')
        const x = t.identifier('x')

        path.replaceWith(t.arrowFunctionExpression(
          [t.restElement(fs)],
          t.arrowFunctionExpression(
            [x],
            t.callExpression(
              t.memberExpression(fs, t.identifier('reduceRight')),
              [
                t.arrowFunctionExpression(
                  [acc, f],
                  t.callExpression(f, [acc])
                ),
                x
              ]
            )
          )
        ))
      }
    }
  }
}
