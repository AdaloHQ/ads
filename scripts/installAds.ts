import { join } from 'https://deno.land/std@0.224.0/path/mod.ts'

const projectPath = Deno.env.get('ADALO_APP_PROJECT_PATH') as string
const FALLBACK_ID = 'ca-app-pub-1111111111111111~1111111111'

const readJsonFile = async (path: string) => {
  try {
    const fileText = await Deno.readTextFile(path)
    return JSON.parse(fileText)
  } catch (error) {
    console.error(`Error reading json file ${path}: `, error.message)
    throw error
  }
}

const getAppIdGlobal = async () => {
  try {
    const protonBundlePath = join(projectPath, 'proton-bundle.json')
    const { default: protonBundle } = await import(protonBundlePath, {
      with: { type: 'json' },
    })

    const ads = protonBundle.libraryGlobals['@adalo/ads']?.Ads ?? {}
    let { andAppIDGlobal, iosAppIDGlobal } = ads

    if (!andAppIDGlobal) {
      console.log(`Could not find andAppIDGlobal in ${protonBundlePath}`)
      // if left blank, builds do not go through
      andAppIDGlobal = FALLBACK_ID
    }
    if (!iosAppIDGlobal) {
      console.log(`Could not find iosAppIDGlobal in ${protonBundlePath}`)
      // if left blank, builds do not go through
      iosAppIDGlobal = FALLBACK_ID
    }

    return { iosAppIDGlobal, andAppIDGlobal }
  } catch (error) {
    console.error(
      `Error getting app id global from proton-bundle.json: `,
      error.message
    )
    throw error
  }
}

const appJsonPath = join(projectPath, '/app.json')
const appJson = await readJsonFile(appJsonPath)
const { andAppIDGlobal, iosAppIDGlobal } = await getAppIdGlobal()

appJson['react-native-google-mobile-ads'] = {
  ios_app_id: iosAppIDGlobal,
  android_app_id: andAppIDGlobal,
}

await Deno.writeTextFile(appJsonPath, JSON.stringify(appJson, null, '  '))
console.log('Added Google Mobile Ads to app.json')
