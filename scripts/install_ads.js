#!/usr/bin/env node

const project_path = process.env.PWD

const protonBundle = require(project_path + '/proton-bundle.json')
const { andAppIDGlobal, iosAppIDGlobal } =
  protonBundle.libraryGlobals['@adalo/ads']?.Ads

if (!andAppIDGlobal) {
  console.log(
    `Could not find andAppIDGlobal in ${project_path}/proton-bundle.json`
  )
}
if (!iosAppIDGlobal) {
  console.log(
    `Could not find iosAppIDGlobal in ${project_path}/proton-bundle.json`
  )
}
// silently fail. Error will be shown in component
if (!andAppIDGlobal && !iosAppIDGlobal) {
  process.exit(0)
}

const appJson = require(`${project_path}/app.json`)

appJson['react-native-google-mobile-ads'] = {
  ios_app_id: iosAppIDGlobal,
  android_app_id: andAppIDGlobal,
}

const fs = require('fs')
fs.writeFileSync(
  `${project_path}/app.json`,
  JSON.stringify(appJson, null, '  ')
)
