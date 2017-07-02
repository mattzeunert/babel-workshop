import * as fns from "./01_parsing"

describe("Parsing", () => {
    test("Finds name of function in `myFunction()`", function(){
        expect(fns.getFunctionName()).toBe("myFunction")
    })

    test("Finds variable names declared in `var a, hello, world`", function () {
        expect(fns.getVariableNames()).toEqual(["a", "hello", "world"])
    })

    test("Gets source code of assigned value", function () {
        expect(fns.getAssignedValueSourceCode()).toEqual("sth().xyz + 5")
    })
})