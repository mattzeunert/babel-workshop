// This is a Babel plugin
// In the node visitors you can update or replace the node
function changeAllStringsToHiPlugin(babel){
    // Turns `"a" + "b"` into `"Hi" + "Hi"`
    return {
        visitor: {
            StringLiteral: function(path){
                path.node.value = "Hi"
            }
        }
    }
}

// Should turn `1 + 2` into `Math.random() + Math.random()`
function turnNumbersIntoMathRandomCalls(babel) {
    const t = babel.types
    return {
        visitor: {
            // You can path.replaceWith(newNode) to replace the current AST node
            // START_SOLUTION
            NumericLiteral: function(path) {
                const call = t.callExpression(
                    t.memberExpression(t.identifier("Math"), t.identifier("random")),
                    []
                )
                path.replaceWith(call)
            }
            // END_SOLUTION
        }
    }
}


// Turns ES2016 `a ** b` into ES5 `Math.pow(a, b)`
function turnExponentiationOperatorToMathPowCallPlugin(babel) {
    const t = babel.types
    return {
        visitor: {
            // START_SOLUTION   
            BinaryExpression: function (path) {
                if (path.node.operator !== "**") {
                    return
                }
                let addCall = t.callExpression(
                    t.memberExpression(t.identifier("Math"), t.identifier("pow")),
                    [path.node.left, path.node.right]
                )
                path.replaceWith(addCall)
            }
            // END_SOLUTION
        }
    }
}

// Renames the variable `sth` to `something` in the function called `doStuff`
// Example: `function doStuff() {var sth = 5; sth++}` => `function doStuff(var something = 5; something++)`
function turnSthToSomethingPlugin(babel) {
    return {
        visitor: {
            // You can use `path.scope.rename(oldName, newName)` to rename a variable in the current scope
            // START_SOLUTION
            FunctionDeclaration: function(path) {
                if (path.node.id.name === "doStuff") {
                    path.scope.rename("sth", "something");
                }
            }
            // END_SOLUTION
        }
    }
}

import * as babel from "babel-core"
function applyPlugin(code, plugin) {
    // Babel `transform` combines these three steps:
    // 1) Parsing
    // 2) Traversing the AST and changing it
    // 3) Generating code from the updated AST
    let transformationResult = babel.transform(code, {
        plugins: [plugin]
    })
    return transformationResult.code
}
export function changeAllStringsToHi(code) {
    return applyPlugin(code, changeAllStringsToHiPlugin)
}
export function turnNumbersIntoMathRandom(code) {
    return applyPlugin(code, turnNumbersIntoMathRandomCalls)
}
export function turnExponentiationOperatorToMathPowCall(code) {
    return applyPlugin(code, turnExponentiationOperatorToMathPowCallPlugin)
}
export function turnSthToSomething(code) {
    return applyPlugin(code, turnSthToSomethingPlugin)
}
