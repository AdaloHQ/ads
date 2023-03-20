#!/usr/bin/env node

const projectPath = process.cwd()

const protonBundle = require(projectPath + '/proton-bundle.json')
const { andAppIDGlobal, iosAppIDGlobal } =
  protonBundle.libraryGlobals['@adalo/ads']?.Ads

if (!andAppIDGlobal) {
  console.log(
    `Could not find andAppIDGlobal in ${projectPath}/proton-bundle.json`
  )
}
if (!iosAppIDGlobal) {
  console.log(
    `Could not find iosAppIDGlobal in ${projectPath}/proton-bundle.json`
  )
}
// silently fail. Error will be shown in component
if (!andAppIDGlobal && !iosAppIDGlobal) {
  process.exit(0)
}

const appJson = require(`${projectPath}/app.json`)

appJson['react-native-google-mobile-ads'] = {
  ios_app_id: iosAppIDGlobal,
  android_app_id: andAppIDGlobal,
}

const fs = require('fs')
fs.writeFileSync(
  `${projectPath}/app.json`,
  JSON.stringify(appJson, null, '  ')
)
