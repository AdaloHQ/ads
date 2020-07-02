import {
  Ads
} from '../../index.js'

export const components = {
  Ads
}

export const config = {"displayName":"Ads","iosInstallScript":"scripts/install_ios.js","androidInstallScript":"scripts/install_android.js","name":"ads","version":"dev","components":[{"name":"Ads","displayName":"Ads","defaultWidth":320,"defaultHeight":50,"props":[{"name":"size","displayName":"Size","type":"text","default":"banner","control":{"type":"menu","options":[{"label":"Standard","value":"banner"},{"label":"Large","value":"largeBanner"},{"label":"Medium Rectangle","value":"mediumRectangle"}]}},{"name":"iosAppID","displayName":"iOS App ID","type":"text"},{"name":"iosAdID","displayName":"iOS Ad ID","type":"text"},{"name":"andAppID","displayName":"Android App ID","type":"text"},{"name":"andAdID","displayName":"Android Ad ID","type":"text"}],"resizeX":false,"resizeY":false}]}