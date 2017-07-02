// todo: wrap everything in a describe call

import * as fns from "./02_construction"
import * as t from "babel-types"
import generate from "babel-generator"

describe("Parsing", () => {
    test("Creates 'Hello' string literal AST node", function () {
        var node = fns.getHelloStringLiteral()
        expect(node.type).toBe("StringLiteral")
        expect(node.value).toBe("Hello")
        expect(generate(node).code).toBe(`"Hello"`)
    })

    test("Creates alert(\"Hello\") call AST node", function () {
        var node = fns.getAlertCall()
        expect(node.type).toBe("CallExpression")
        expect(generate(node).code).toBe(`alert("Hello")`)
    })

    test("Creates Math.pow({{base}}, {{exponent}}) call AST node", function () {
        var node = fns.getMathPowCall(t.numericLiteral(8), t.numericLiteral(2))
        expect(node.type).toBe("CallExpression")
        expect(generate(node).code).toBe(`Math.pow(8, 2)`)
    })

    test("Creates Math.pow(8, 2) call AST node using Babel template", function () {
        var node = fns.getMathPowCallUsingBabelTemplate(t.numericLiteral(8), t.numericLiteral(2))
        expect(node.expression.type).toBe("CallExpression")
        expect(generate(node.expression).code).toBe(`Math.pow(8, 2)`)
    })

    test("Creates Math.pow(8, 2) call source code string", function () {
        var code = fns.getMathPowCallAsString(t.numericLiteral(8), t.numericLiteral(2))
        expect(code).toEqual(`Math.pow(8, 2);`)
    })
})