#!/usr/bin/env node

const projectPath = process.cwd()

const protonBundle = require(projectPath + '/proton-bundle.json')
let { andAppIDGlobal, iosAppIDGlobal } =
  protonBundle.libraryGlobals['@adalo/ads']?.Ads || {}

if (!andAppIDGlobal) {
  console.log(
    `Could not find andAppIDGlobal in ${projectPath}/proton-bundle.json`
  )
  // if left blank, builds do not go through
  andAppIDGlobal = 'ca-app-pub-1111111111111111~1111111111'
}
if (!iosAppIDGlobal) {
  console.log(
    `Could not find iosAppIDGlobal in ${projectPath}/proton-bundle.json`
  )
  // if left blank, builds do not go through
  iosAppIDGlobal = 'ca-app-pub-1111111111111111~1111111111'
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
