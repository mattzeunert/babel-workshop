# Workshop: ASTs and writing custom Babel plugin

tell ppll how to find solutions

## Why

- bg understanding
- add functionalty
- write codemods / rewrite code / migrate to new way

- lint code with custom eslint plugins
- show how to debug jest


## Setup 

-- ask ppl to check their node version

-- have to intro jest somehow in case ppl aren't familiar with unit tests
--> first code change has to be super super simple

## How to do the exercises

// where to find the source code, where to find solutions


## Resources:

- [AST Explorer](https://astexplorer.net/): explore the JS syntax tree, write Babel plugins
- [Babel Plugin Handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md): detailed guide on writing Babel plugins



- why transform obj assign... first capture it, but also bc it shows you some of the edge cases you'll have to consider when writing babel plugins


-- feel free to check out actual implementation https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-exponentiation-operator/src/index.js#L10

// i could just show slides of the manual traversal...

// make sure ppl have reference material, like how to find available t.sthExpressions etc
// what is state value that's passed into visitor?



before asking ppl to start show how to look up in ast exploer, how to log stuff out etc... inspect in debugger ast tree

Node 6