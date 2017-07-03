// babel plugin scleanup task: transform cake["hi"]  to cake.hi

// log every assignment that is made

/*
FunctionDeclaration(path) {
  path.scope.rename("n", "x");
}
- function square(n) {
-   return n * n;
+ function square(x) {
+   return x * x;
  }

  */

  // tell ppl to check out the actual implemtnation: https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-exponentiation-operator/src/index.js#L10