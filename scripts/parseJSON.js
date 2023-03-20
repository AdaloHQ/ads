#!/usr/bin/env node

const [, , ...args] = process.argv
if (args.length !== 2) {
  console.error(
    'Usage:\n\n node parseJSON.js [PROJECT_PATH] [PLATFORM_ID]\n'
  )
  process.exit(1)
}
const project_path = args[0]
const platform_id = args[1]
const protonBundle = require(project_path + '/proton-bundle.json')
const appID = protonBundle.libraryGlobals['@adalo/ads']['Ads'][`${platform_id}`]

if (!appID) {
  console.error(`Could not find ${platform_id} in ${project_path}/proton-bundle.json` )
  process.exit(1)
} 

console.log(appID.replace(/\s/g, ''))
