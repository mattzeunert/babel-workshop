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