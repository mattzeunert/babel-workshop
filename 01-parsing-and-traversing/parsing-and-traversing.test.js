// neeed node 6.x +

// const babylon = require("babylon")
import * as babylon from "babylon"

// i could just show slides of the manual traversal...

// make sure ppl have reference material, like how to find available t.sthExpressions etc
// what is state value that's passed into visitor?

function getVariableNames(code){
    var ast = babylon.parse(code)
    var variableDeclarators = ast.program.body[0].declarations
    return variableDeclarators.map(decl => decl.id.name)
}

function getVariableNames2(code){
    var ast = babylon.parse(code)
    var programItems = ast.program.body
    var variableDeclarators = []
    programItems.forEach(function(declaration){
        variableDeclarators = variableDeclarators.concat(declaration.declarations)
    })
    return variableDeclarators.map(decl => decl.id.name)
}


const traverse = require("babel-traverse").default
function getVariableNames3(code){
    var ast = babylon.parse(code)
    var variableNames = []
    traverse(ast, {
      VariableDeclarator: function (path) {
        // if (path.node.type === "") {
            variableNames.push(path.node.id.name)
        // }
      }
    });
    return variableNames
}

function countStringLiterals(code){
    var ast = babylon.parse(code)
    var count = 0;
    traverse(ast, {
      enter: function (path) {
        if (path.node.type === "StringLiteral") {
            count++;
        }
      }
    });
    return count
}

var generate = require("babel-generator").default
function changeAllStringsToHi(code){
    var ast = babylon.parse(code)
    var count = 0;
    traverse(ast, {
      enter: function (path) {
        if (path.node.type === "StringLiteral") {
            path.node.value = 'hi'
        }
      }
    });
    return generate(ast).code
}

var babel = require("babel-core");
function changeAllStringsToHi2(code){
    return babel.transform(code, {
        plugins: [function(){
            return {
                visitor: {
                    StringLiteral: function(path, state){
                        // console.log("state", state)
                        path.node.value = 'hi'
                    }
                }
            }
        }]
    }).code
}

function changeAllStringsToHi3(code){
    return babel.transform(code, {
        plugins: [function(babel){
            return {
                visitor: {
                    StringLiteral: function(path, state){
                        // path.replaceWith(babel.types.callExpression(
                        //     babel.types.identifier("getHi"),
                        //     []
                        // ))
                        path.replaceWithSourceString('getHi()')
                    }
                }
            }
        }]
    }).code
}

function compilePow(code){
    function powPlugin(babel){
        const types = babel.types
        return {
            visitor: {
                BinaryExpression: function(path, state){
                    if (path.node.operator !== "**") {
                        return
                    }

                    var powExpression = path.node

                    var powCall = types.callExpression(
                        types.memberExpression(
                            types.identifier("Math"),
                            types.identifier("pow")
                        ),
                        [powExpression.left, powExpression.right]
                    )

                    path.replaceWith(powCall)
                    // path.replaceWith(babel.types.callExpression(
                    //     babel.types.identifier("getHi"),
                    //     []
                    // ))
                    
                }
            }
        }
    }

    return babel.transform(code, {
        plugins: [powPlugin]
    }).code
}

// replace all str lits with "hi", regenerate

test("Can find variable names", () => {
    var variableNames = getVariableNames("var a, b, c")
    expect(variableNames).toEqual(["a", "b", "c"])
});

test("Can find variable names", () => {
    var variableNames = getVariableNames2("var a, b, c; var d, e, f")
    expect(variableNames).toEqual(["a", "b", "c", "d", "e", "f"])
});

test("Can find variable names", () => {
    var variableNames = getVariableNames3("var a, b, c; var d, e, f; function sth(){ var g, h, i }")
    expect(variableNames).toEqual(["a", "b", "c", "d", "e", "f", "g", "h", "i"])
});

test("Count number of string literals", () => {
    var variableNames = countStringLiterals("var str = ''; for (var i=0; i<10; i++) { str += i; str += '\\n';}")
    expect(variableNames).toBe(2)
});

test("Change all strings to 'hi'", () => {
    var newCode = changeAllStringsToHi("var str = 'Hello' + 'World'")
    expect(newCode).toBe(`var str = "hi" + "hi";`)
});

test("Change all strings to 'hi' --- babel-core", () => {
    var newCode = changeAllStringsToHi2("var str = 'Hello' + 'World'")
    expect(newCode).toBe(`var str = 'hi' + 'hi';`)
});

test("Change all strings to 'hi' --- getHi", () => {
    var newCode = changeAllStringsToHi3("var str = 'Hello' + 'World'")
    expect(newCode).toBe(`var str = getHi() + getHi();`)
});

describe("**", () => {
    test("Replaces ** with Math.pow calls", () => {
        var oldCode = "5 ** 2"
        var newCode = compilePow(oldCode)
        expect(newCode).toBe("Math.pow(5, 2);")
    })

    test("Replaces ** with Math.pow calls", () => {
        var oldCode = "5 ** (1 + 1)"
        var newCode = compilePow(oldCode)
        expect(newCode).toBe("Math.pow(5, 1 + 1);")
    })

    test("Replaces ** with Math.pow calls", () => {
        var oldCode = "var a = b ** test()"
        var newCode = compilePow(oldCode)
        expect(newCode).toBe("var a = Math.pow(b, test());")
    })

    test("Ignores non ** binary expressions", () => {
        var oldCode = "a + b"
        var newCode = compilePow(oldCode)
        expect(newCode).toBe("a + b;")
    })

    test("Replaces ** with Math.pow calls", () => {
        var oldCode = "a ** b ** c"
        var newCode = compilePow(oldCode)
        expect(newCode).toBe("Math.pow(a, Math.pow(b, c));")
    })
})