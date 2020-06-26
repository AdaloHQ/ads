const fs = require('fs')
let rawData = fs.readFileSync('../../packager/builds/AdaloApp/proton-bundle.json');
let parsedData = JSON.parse(rawData);
let stringData = JSON.stringify(parsedData);
let i = stringData.indexOf('"' + "iosAppID" + '":')+12
let string = '';
while(i < stringData.indexOf('"' + "iosAppID" + '":')+100){
    string+=stringData[i]
    ++i
}
let iosAppID = string.split('"')
iosAppID = iosAppID[0]
appID = iosAppID.replace(/\s/g,'')
try {
    process.chdir('../../template-app/ios/TavoloRestaurant');
    console.log('New directory: ' + process.cwd());
}
catch (err) {
    console.log('chdir: ' + err);
}
const { exec } = require('child_process');

exec('plutil -remove GADApplicationIdentifier info.plist', () => {
    exec('plutil -insert GADApplicationIdentifier -string ' + appID + ' info.plist', (err) => {
        if (err) {
          console.error('error: ' + err)
        } else {
         console.log(`added!`);
        }
      });
  });