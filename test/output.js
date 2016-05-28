(function () {
  var _ret;

  for (let i = 0; i < list.length; ++i) _ret = sideEffect(list[i]);

  return _ret;
})();

(...a) => f(g(...a));
(...b) => f(g(h(i(a(...b)))));