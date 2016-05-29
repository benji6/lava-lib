(...fs) => (...xs) => fs.slice(0, fs.length - 1).reduceRight((acc, f) => f(acc), fs[fs.length - 1](...xs));
(...b) => f(g(h(a(...b))));
f(g(h(a(b, c, d))));
