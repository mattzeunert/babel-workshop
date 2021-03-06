import * as babylon from "babylon"

// Should return "myFunction"
export function getFunctionName(){
    // Look up the function name in the `ast` object and return it
    let code = `myFunction()`
    let ast = babylon.parse(code)
    
}

// Should return ["a", "hello", "world"]
export function getVariableNames(){
    let code = `var a, hello, world`
    
}

// Should return "sth().xyz + 5"
export function getAssignedValueSourceCode() {
    // Each AST node has a loc property that says where in the source code that node is located
    let code = `a = sth().xyz + 5`
    
}
