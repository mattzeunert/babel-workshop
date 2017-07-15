import * as babylon from "babylon"


function parseAndReturnBody(code) {
	let ast = babylon.parse(code);
    return ast.program.body[0];
}

// Should return "myFunction"
export function getFunctionName(){
    // Look up the function name in the `ast` object and return it
    let code = `myFunction()`;
    return parseAndReturnBody(code).expression.callee.name;
    
}

// Should return ["a", "hello", "world"]
export function getVariableNames(){
    let code = `var a, hello, world`;
	let declarations = parseAndReturnBody(code).declarations;
    return declarations.map(p => p.id.name);
    
}

// Should return "sth().xyz + 5"
export function getAssignedValueSourceCode() {
    // Each AST node has a loc property that says where in the source code that node is located
    let code = `a = sth().xyz + 5`;
    let assignmentExpression = parseAndReturnBody(code).expression.right;
    let start = assignmentExpression.start;
    let end = assignmentExpression.end;
    return code.substring(start, end);
    
}
