import * as babylon from "babylon"

// Should return "myFunction"
export function getFunctionName(){
    // Look up the function name in the `ast` object and return it
    let code = `myFunction()`
    let ast = babylon.parse(code)
    // prob can go through this in front of ppl,,, look at ast explorer
    // START_SOLUTION
    return ast.program.body[0].expression.callee.name
    // END_SOLUTION
}

// Should return ["a", "hello", "world"]
export function getVariableNames(){
    let code = `var a, hello, world`
    // START_SOLUTION
    let ast = babylon.parse(code)
    let declarations = ast.program.body[0].declarations
    return declarations.map(decl => decl.id.name)
    // END_SOLUTION
}

// Should return "sth().xyz + 5"
export function getAssignedValueSourceCode() {
    // Each AST node has a loc property that says where in the source code that node is located
    let code = `a = sth().xyz + 5`
    // START_SOLUTION
    let ast = babylon.parse(code)
    let assignment = ast.program.body[0].expression
    let loc = assignment.right.loc
    return code.slice(loc.start.column, loc.end.column)
    // END_SOLUTION
}
