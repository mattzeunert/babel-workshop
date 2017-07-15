import * as babylon from "babylon"
import traverse from "babel-traverse"

// Returns how many string literals are used in the source code
// Example: if code is `"Hello" + " World"` should return 2
export function countStringLiterals(code) {
    let ast = babylon.parse(code);
    let count = 0;
    traverse(ast, {
        // visitor for a certain node type
        StringLiteral: function () {
            count++;
        }
    });
    return count;
}

// Returns how many identifiers are used in the source code
export function countIdentifiers(code) {
    let ast = babylon.parse(code);
    let identifierCount = 0;

    traverse(ast, {
       Identifier: function () {
           identifierCount++;
       }
    });

    return identifierCount;
}

// Returns how many string literals with name i are used in the source code
// Example `i + i + n` ==> 2
export function countIdentifiersWithNameI(code) {
    // In the visitor you have access to the AST node via `path.node`
    // Paths also give you access to the parent node and information about the local scope
    // More info about paths: https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#paths
    let ast = babylon.parse(code);
    let iCount = 0;

    traverse(ast, {
        Identifier: function (path) {
            if (path.node.name === 'i') {
                iCount++;
            }
        }
    });

    return iCount;
}

// Returns name of longest identifier
// Example: `abc + defg` ==> "defg"
export function findLongestIdentifier(code) {
    let ast = babylon.parse(code);
    let longestIdentifier = '';

    traverse(ast, {
        Identifier: function (path) {
            let { name } = path.node;
            if (name > longestIdentifier) {
				longestIdentifier = name;
            }
        }
    });
    
    return longestIdentifier;
}

// Returns how many nodes of each type exist in the AST
// Example: `a + b`
/* {
    Program: 1,
    ExpressionStatement: 1,
    BinaryExpression: 1,
    Identifier: 2
}
*/
export function getNodeCountByType(code) {
    // You can use `enter` as a catch-all visitor, instead of a specific node type like `StringLiteral`
    let ast = babylon.parse(code);
    let nodesByType = {};

    traverse(ast, {
        enter: function (path) {
            let { type } = path.node;
			if (!nodesByType[type]) {
				nodesByType[type] = 0;
            }

			nodesByType[type]++;
		}
    });
    
    return nodesByType;
}

// Try your code on real files! Change SHOW_STATS to true
const SHOW_STATS = false
const url = "https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"
// const url = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"
// const url = "https://a.trellocdn.com/js/0a5b55922c036780f28ba28f0034a174/app.js" // (SLOW!)
// const url = "https://www.youtube.com/yts/jsbin/player-vflotiWiu/en_US/base.js" // (SLOW!)
// const url = "https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.25.0/babel.js" // (SLOW!)

export function printStats(fetchUrl){
    if (!SHOW_STATS) {
        return;
    }
    fetchUrl(url, (code) => {
        let log = "\n"
        log += "Longest identifier: " + findLongestIdentifier(code) + "\n"
        log += "\n"
        let byType = getNodeCountByType(code)
        log += "\n" + prettifyByType(byType)

        log += "\n\nDon't forget to set SHOW_STATS back to false when you're done. Traversing the AST for large files is slow!"
        console.log(log)
    })

    function prettifyByType(byType){
        let _ = require("lodash")
        byType = _.toPairs(byType)
        byType = _.sortBy(byType, typeInfo => -typeInfo[1])
        var Table = require('easy-table')
        var t = new Table()
        byType.forEach((typeInfo) => {
            t.cell('Node Type', typeInfo[0])
            t.cell('Node Count', typeInfo[1])
            t.newRow()
            return typeInfo[0] + ": " + typeInfo[1]
        })
        return t.toString()
    }
}
