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
    let adIdLocal
    if (Platform.OS === 'ios') {
      if (iosAdID) {
        adIdLocal = iosAdID.replace(/\s/g, '')
        if (size === 'interstitial') {
          console.log('setting ad id')
          setAdID(adIdLocal)
        }
      }
    } else if (Platform.OS === 'android') {
      if (andAdID) {
        let adIdLocal = andAdID.replace(/\s/g, '')
        if (size === 'interstitial') {
          setAdID(adIdLocal)
        }
      }
    }
  }, [Platform.OS, iosAdID, andAdID])

  useEffect(() => {
    if (size === 'interstitial') {
      AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId])

      AdMobInterstitial.addEventListener('adLoaded', () =>
        console.log('AdMobInterstitial adLoaded')
      )
      AdMobInterstitial.addEventListener('adFailedToLoad', error =>
        console.warn('Ad failed to load! Error:', error)
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
    }
  }, [size])

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
