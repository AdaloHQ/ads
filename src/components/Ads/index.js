import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob'

const Ads = props => {
  let {
    iosAdID,
    andAdID,
    size,
    iosAppIDGlobal,
    iosAppID,
    andAppIDGlobal,
    andAppID,
  } = props

  if (
    (Platform.OS === 'ios' && !(iosAppIDGlobal || iosAppID)) ||
    (Platform.OS === 'android' && !(andAppIDGlobal || andAppID))
  ) {
    const platformPretty = Platform.OS === 'ios' ? 'iOS' : 'Android'
    return (
      <View style={styles.errorView}>
        <Text style={styles.errorText}>
          Component Setup Incomplete. {platformPretty} App ID was left blank.
        </Text>
      </View>
    )
  }

  const [adID, setAdID] = useState('')

  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (iosAdID) setAdID(iosAdID.replace(/\s/g, ''))
    } else if (Platform.OS === 'android') {
      if (andAdID) setAdID(andAdID.replace(/\s/g, ''))
    }
  }, [Platform.OS, iosAdID, andAdID])
  console.log('adID', adID)
  useEffect(() => {
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId])
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/4411468910')

    AdMobInterstitial.addEventListener('adLoaded', () =>
      console.log('AdMobInterstitial adLoaded')
    )
    AdMobInterstitial.addEventListener('adFailedToLoad', error =>
      console.warn(error)
    )
    AdMobInterstitial.addEventListener('adOpened', () =>
      console.log('AdMobInterstitial => adOpened')
    )
    AdMobInterstitial.addEventListener('adClosed', () => {
      console.log('AdMobInterstitial => adClosed')
      AdMobInterstitial.requestAd().catch(error => console.warn(error))
    })
    AdMobInterstitial.addEventListener('adLeftApplication', () =>
      console.log('AdMobInterstitial => adLeftApplication')
    )

    AdMobInterstitial.requestAd().catch(error => console.warn(error))
    return function cleanup() {
      AdMobInterstitial.removeAllListeners()
      console.log('ad gone?')
    }
  }, [])

  //AdMobInterstitial.setAdUnitID(adID)
  //AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd())
  useEffect(() => {
    AdMobInterstitial.showAd().catch(error => console.warn(error + ' oh boy'))
  })
  return (
    <View style={styles.wrapper}>
      {/* <AdMobBanner
        adSize={size}
        adUnitID={adID}
        onAdFailedToLoad={error => console.error(error)}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorView: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
    padding: 8,
  },
  errorText: {
    textAlign: 'center',
    color: '#FF0000',
  },
})

export default Ads
