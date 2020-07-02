let fs = require('fs')
let rawData = fs.readFileSync('../../packager/builds/AdaloApp/proton-bundle.json');
let parsedData = JSON.parse(rawData);
let stringData = JSON.stringify(parsedData);
let i = stringData.indexOf('"' + "andAppID" + '":')+12
let string = '';
while(i < stringData.indexOf('"' + "andAppID" + '":')+100){
    string+=stringData[i]
    ++i
}
let andAppID = string.split('"')
andAppID = andAppID[0]
appID = andAppID.replace(/\s/g,'')
try {
    process.chdir('../../packager/builds/AdaloApp/android/app/src/main');
    console.log('New directory: ' + process.cwd());
}
catch (err) {
    console.log('chdir: ' + err);
}

parseString = require("xml2js").parseString;
xml2js = require("xml2js");
fs.readFile("AndroidManifest.xml", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    }
    parseString(data, function(err, result) {
        if (err) {
            console.log(err);
        }
       let json = result
       json.manifest.application[0]['meta-data'][0]['$']['android:value'] = appID 
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(json);

        fs.writeFile("AndroidManifest.xml", xml, function(err, data) {
        if (err) console.log(err);

        console.log("successfully written our update xml to file");
        });
      });
});
