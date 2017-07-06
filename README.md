# Workshop: ASTs and writing custom Babel plugins

Babel is JavaScript compiler that allows you to write code transformation rules. These transformations are based on the code's [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) representation.

## Why learn about ASTs?

- Improve your background understanding of the JavaScript language
- Write custom Babel plugins
- Write custom ESLint plugins

## Setup 

Run `npm install`.
## How to do the exercises

Run `npm run test-watch` to run the tests, then work through them one by one to make the tests pass.

The code you need to change is in the `exercises` directory. Start with the [`01_parsing.js`](https://github.com/mattzeunert/babel-workshop/blob/master/exercises/01_parsing.js) file, then `02_constructions.js` etc.

If you get stuck you can check the [solutions](https://github.com/mattzeunert/babel-workshop/tree/master/solutions), or ask me in person or by [creating an issue](https://github.com/mattzeunert/babel-workshop/issues).

## Resources

- [AST Explorer](https://astexplorer.net/): explore the JS syntax tree, write Babel plugins
- [Babel Plugin Handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md): detailed guide on writing Babel plugins

- Workshop slides: TODO
- [Video intro to ASTs](https://www.youtube.com/watch?v=CFQBHy8RCpg&feature=youtu.be) by [Kent C. Dodds](https://twitter.com/kentcdodds)