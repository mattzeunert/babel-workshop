import { countStringLiterals, countIdentifiers, findLongestIdentifier, getNodeCountByType, getVariablesInScopeInForLoopBody, countIdentifiersWithNameI, printStats } from "./03_traversal"
import request from "request"

describe("Traversal", () => {
    var sourceCode = [
        {
            code: `i = "Hi!"`,
            stringLiterals: 1,
            identifiers: 1,
            longestIdentifiers: "i",
            iIdentifiers: 1,
            nodeCountByType: {
                AssignmentExpression: 1,
                ExpressionStatement: 1,
                Identifier: 1,
                Program: 1,
                StringLiteral: 1
            }
        },
        {
            code: `var greeting = "Hello" + " World"`,
            stringLiterals: 2,
            identifiers: 1,
            iIdentifiers: 0,
            longestIdentifiers: "greeting",
            nodeCountByType: {
                BinaryExpression: 1,
                Identifier: 1,
                Program: 1,
                StringLiteral: 2,
                VariableDeclaration: 1,
                VariableDeclarator: 1
            }
        },
        {
            code: `var numbers = ""; for (var i=0; i<10;i++){ numbers += "#" + i + "\\n" }`,
            stringLiterals: 3,
            identifiers: 6,
            iIdentifiers: 4,
            longestIdentifiers: "numbers",
            nodeCountByType: {
                AssignmentExpression: 1,
                BinaryExpression: 3,
                BlockStatement: 1,
                ExpressionStatement: 1,
                ForStatement: 1,
                Identifier: 6,
                NumericLiteral: 2,
                Program: 1,
                StringLiteral: 3,
                UpdateExpression: 1,
                VariableDeclaration: 2,
                VariableDeclarator: 2
            }
        }
    ]

    sourceCode.forEach((source) => {
        test("Counts string literals in `" + source.code + "`", () => {
            expect(countStringLiterals(source.code)).toBe(source.stringLiterals)
        })
    })

    sourceCode.forEach((source) => {
        test("Count identifiers in `" + source.code + "`", () => {
            expect(countIdentifiers(source.code)).toEqual(source.identifiers)
        })
    })

    sourceCode.forEach((source) => {
        test("Count identifiers with name `i` in `" + source.code + "`", () => {
            expect(countIdentifiersWithNameI(source.code)).toEqual(source.iIdentifiers)
        })
    })

    sourceCode.forEach((source) => {
        test("Finds longest identifier in `" + source.code + "`", () => {
            expect(findLongestIdentifier(source.code)).toEqual(source.longestIdentifiers)
        })
    })
    

    sourceCode.forEach((source) => {
        test("Counts nodes by type in `" + source.code + "`", () => {
            expect(getNodeCountByType(source.code)).toEqual(source.nodeCountByType)
        })
    })

    test("whatever", (done) => {
        var fetchCalled = false
        printStats(function fetch(url, callback){
            fetchCalled  = true
            console.log("Getting stats for " + url + "...")
            request(url, function (error, response, body) {
                if (error) {
                    console.log("Fetching URL didn't work: " + url)
                    done()
                    return
                }

                let code = body.toString()
                callback(code)
                done()
            })
        })
        if (!fetchCalled) {
            done()
        }
    })
})
