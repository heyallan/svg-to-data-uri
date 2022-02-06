// Wrapper for calling svg-to-data-uri using node.js
//
var fs = require('fs');
var vm = require('vm');

// Doing this instead of 'require' so I don't have to 
// taint svg-to-data-uri.js with a 'module.exports' line.
//
vm.runInThisContext(fs.readFileSync(__dirname + "/svg-to-data-uri.js"));

if (process.argv.length < 3) {
    console.log("Usage: \n" + 
        "   $ node svg-to-date-uri-cl svgfile > outfile\n");
} else {
    fs.readFile(process.argv[2], 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(svgToDataURI(data))
      })
}
