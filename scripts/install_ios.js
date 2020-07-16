#!/usr/bin/env node
const JefNode = require('json-easy-filter').JefNode
const [, , ...args] = process.argv
if (args.length !== 1) {
  console.error('Usage:\n\n node install_ios.js [PROJECT_PATH]\n')
  process.exit(1)
}
let project_path = args[0]
let fs = require('fs');
let rawData = fs.readFileSync(project_path + '/proton-bundle.json');
let protonBundle = JSON.parse(rawData);
let appID
new JefNode(protonBundle).filter(node => {
  if (node.key == 'iosAppID') {
    appID = node.value
  }
})
let appIDFinal = appID.replace(/\s/g,'')
console.log(appIDFinal)

// let JefNode = require('json-easy-filter').JefNode
// const protonBundle = require('../../template-app/proton-bundle.json')
// let appID
// new JefNode(protonBundle).filter(node => {
//   if (node.key == 'iosAppID') {
//     appID = node.value
//   }
// })
// let appIDFinal = appID.replace(/\s/g,'')
// console.log(appIDFinal)