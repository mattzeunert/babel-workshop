// neeed node 6.x +

const babylon = require("babylon")

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
      enter: function (path) {
        if (path.node.type === "VariableDeclarator") {
            variableNames.push(path.node.id.name)
        }
      }
    });
    return variableNames
}

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