#!/usr/bin/env node
const JefNode = require("json-easy-filter").JefNode;
const [, , ...args] = process.argv;
if (args.length !== 2) {
  console.error(
    "Usage:\n\n node install_android.js [PROJECT_PATH] [PLATFORM_ID]\n"
  );
  process.exit(1);
}
let project_path = args[0];
let platform_id = args[1];
// let fs = require('fs');
// let rawData = fs.readFileSync(project_path + '/proton-bundle.json');
// let protonBundle = JSON.parse(rawData);
let protonBundle = require(project_path, "/proton-bundle.json");
let appID;
console.log(protonBundle);
new JefNode(protonBundle).filter((node) => {
  if (node.key == platform_id) {
    appID = node.value;
  }
});
let appIDFinal = appID.replace(/\s/g, "");
console.log(appIDFinal);

// local testing
// let JefNode = require('json-easy-filter').JefNode
// const protonBundle = require('../../packager/builds/AdaloApp/proton-bundle.json')
// let appID
// new JefNode(protonBundle).filter(node => {
//   if (node.key == 'andAppID') {
//     appID = node.value
//   }
// })
// let appIDFinal = appID.replace(/\s/g,'')
// console.log(appIDFinal)
