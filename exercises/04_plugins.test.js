import * as plugins from "./04_plugins"

describe("Babel Plugins", () => {
    function runTests(tests, fn) {
        Object.keys(tests).forEach((beforeCode) => {
            const afterCode = tests[beforeCode]
            test("Turns `" + beforeCode + "` into `" + afterCode + "`", () => {
                expect(fn(beforeCode)).toBe(afterCode)
            })
        })
    }

    test("stuff", () => {
        var newCode = plugins.changeAllStringsToHi(`var a = "a";a += "b"`)
        expect(newCode).toBe(`var a = "Hi";a += "Hi";`)
    })

    describe("turnNumbersIntoMathRandomPlugin", () => {
        runTests({
            "5 + 1": `Math.random() + Math.random();`,
            "a + 1": `a + Math.random();`,
            "function inc(a){ return a + 1 }": `function inc(a) {\n  return a + Math.random();\n}`
        }, plugins.turnNumbersIntoMathRandom)
    })

    describe("turnExponentiationOperatorToMathPowCall", () => {
        runTests({
            "5 ** 2": `Math.pow(5, 2);`,
            "a ** 2": `Math.pow(a, 2);`,
            "a - 1": `a - 1;`,
            "1 ** 2 ** 3": `Math.pow(1, Math.pow(2, 3));`
        }, plugins.turnExponentiationOperatorToMathPowCall)
    })

    describe("turnSthToSomething", () => {
        runTests({
            "a + b": "a + b;",
            "function doStuff() { var sth = 1; sth++; return sth }": "function doStuff() {\n  var something = 1;something++;return something;\n}",
            "function doThings() { var sth = 5}": "function doThings() {\n  var sth = 5;\n}"
        }, plugins.turnSthToSomething)
    })
    
})