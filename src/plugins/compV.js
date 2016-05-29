const charCodeA = 97

module.exports = ({types: t}) => {
  return {
    visitor: {
      CallExpression (path) {
        if (t.isCallExpression(path.node.callee) && path.node.callee.callee.name === 'compV') {
          path.replaceWith(path.node.callee.arguments
              .reduceRight(
                (acc, arg) => t.callExpression(arg, Array.isArray(acc) ? acc : [acc]),
                path.node.arguments)
              )
          return
        }

        if (path.node.callee.name !== 'compV') return

        const args = path.node.arguments
        const argNames = args.map(x => x.name)

        let charCode = charCodeA
        let char;
        while (argNames.includes(char = String.fromCharCode(charCode))) charCode++

        path.replaceWith(t.arrowFunctionExpression(
          [t.restElement(t.identifier(char))],
          args.reduceRight((acc, arg) => t.callExpression(arg, [acc]), t.spreadElement(t.identifier(char)))
        ))
      },
      Identifier (path) {
        if (path.node.name !== 'compV') return

        const acc = t.identifier('acc')
        const f = t.identifier('f')
        const fs = t.identifier('fs')
        const fsLengthMinus1 = t.binaryExpression('-', t.memberExpression(fs, t.identifier('length')), t.numericLiteral(1))
        const xs = t.identifier('xs')

        path.replaceWith(t.arrowFunctionExpression(
          [t.restElement(fs)],
          t.arrowFunctionExpression(
            [t.restElement(xs)],
            t.callExpression(
              t.memberExpression(
                t.callExpression(
                  t.memberExpression(fs, t.identifier('slice')),
                  [
                    t.numericLiteral(0),
                    fsLengthMinus1
                  ]
                ),
                t.identifier('reduceRight')),
              [
                t.arrowFunctionExpression(
                  [acc, f],
                  t.callExpression(f, [acc])
                ),
                t.callExpression(t.memberExpression(fs, fsLengthMinus1, true), [t.spreadElement(xs)])
              ]
            )
          )
        ))
      }
    }
  }
}
