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

  const logError = error => {
    console.error('Error loading ad!:', error)
  }

  useEffect(() => {
    let adIdLocal
    if (Platform.OS === 'ios') {
      if (iosAdID) {
        adIdLocal = iosAdID.replace(/\s/g, '')
        setAdID(adIdLocal)
        if (size === 'interstitial') {
          showInterstitial(adIdLocal)
        }
      }
    } else if (Platform.OS === 'android') {
      if (andAdID) {
        let adIdLocal = andAdID.replace(/\s/g, '')
        setAdID(adIdLocal)
        if (size === 'interstitial') {
          showInterstitial(adIdLocal)
        }
      }
    }
  }, [Platform.OS, iosAdID, andAdID])

  const showInterstitial = adIdLocal => {
    AdMobInterstitial.setAdUnitID(adIdLocal)
    AdMobInterstitial.requestAd()
      .then(() => {
        AdMobInterstitial.showAd().catch(error =>
          console.warn(error + ' error showing ad')
        )
      })
      .catch(error => {
        console.warn(error + ' ERROR REQUESTING AD')
        logError(error)
      })
  }

  useEffect(() => {
    if (size === 'interstitial') {
      AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId])

      AdMobInterstitial.addEventListener('adLoaded', () =>
        console.log('AdMobInterstitial adLoaded')
      )
      AdMobInterstitial.addEventListener('adFailedToLoad', error => {
        console.warn('Ad failed to load!', error)
        logError(error)
      })
      AdMobInterstitial.addEventListener('adOpened', () =>
        console.log('AdMobInterstitial => adOpened')
      )
      AdMobInterstitial.addEventListener('adClosed', () => {
        console.log('AdMobInterstitial => adClosed')
      })
      AdMobInterstitial.addEventListener('adLeftApplication', () =>
        console.log('AdMobInterstitial => adLeftApplication')
      )

      return function cleanup() {
        AdMobInterstitial.removeAllListeners()
        console.log('ad gone?')
      }
    }
  }, [size])

  return (
    <View style={styles.wrapper}>
      {size !== 'interstitial' && !!adID && (
        <AdMobBanner
          adSize={size}
          adUnitID={adID}
          onAdFailedToLoad={error => logError(error)}
          testDevices={[AdMobBanner.simulatorId]}
        />
      )}
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
