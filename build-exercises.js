const glob = require("glob")
const fs = require("fs")

glob("solutions/*js", function(err, files){
    files.forEach(function(file){
        let fileContents = fs.readFileSync(file).toString()
        const exerciseFilePath = file.replace("solutions/", "exercises/")
        fileContents = fileContents.replace(/\/\/ START_SOLUTION[\s\S]*?\/\/ END_SOLUTION/g, "")
        fs.writeFileSync(exerciseFilePath, fileContents)
    })
})