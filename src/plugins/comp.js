const charCodeA = 97

module.exports = ({types: t}) => {
  return {
    visitor: {
      CallExpression (path) {
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
      }
    }
  }
}
