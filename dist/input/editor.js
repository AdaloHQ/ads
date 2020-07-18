import {
  Ads
} from '../../index.js'

export const components = {
  Ads
}

export const config = {"displayName":"AdMob Banner","iosInstallScript":"scripts/install_ios.sh","androidInstallScript":"scripts/install_android.sh","name":"ads","version":"dev","components":[{"name":"Ads","displayName":"AdMob Banner","defaultWidth":320,"defaultHeight":50,"props":[{"name":"size","displayName":"Size","type":"text","default":"banner","control":{"type":"menu","options":[{"label":"Standard","value":"banner"},{"label":"Large","value":"largeBanner"},{"label":"Medium Rectangle","value":"mediumRectangle"}]},"helpText":"Learn More about [Configuring the Admob Component](https://help.adalo.com/component-basics/google-admob)"},{"name":"iosAppID","displayName":"AdMob iOS App ID","type":"text","placeholder":"ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"},{"name":"iosAdID","displayName":"AdMob iOS Ad ID","type":"text","placeholder":"ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX"},{"name":"andAppID","displayName":"AdMob Android App ID","type":"text","placeholder":"ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"},{"name":"andAdID","displayName":"AdMob Android Ad ID","type":"text","placeholder":"ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX"}],"resizeX":false,"resizeY":false}]}