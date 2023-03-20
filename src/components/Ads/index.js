import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import mobileAds, {
  InterstitialAd,
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads'

const sizesMap = {
  banner: BannerAdSize.BANNER,
  largeBanner: BannerAdSize.LARGE_BANNER,
  mediumRectangle: BannerAdSize.MEDIUM_RECTANGLE,
  interstitial: null,
}

const Ads = props => {
  let { iosAdID, andAdID, iosAppIDGlobal, andAppIDGlobal, size } = props

  const isAndroid = Platform.OS === 'android'

  if ((!isAndroid && !iosAppIDGlobal) || (isAndroid && !andAppIDGlobal)) {
    return (
      <View style={styles.errorView}>
        <Text style={styles.errorText}>
          Component Setup Incomplete. {isAndroid ? 'Android' : 'iOS'} App ID was
          left blank.
        </Text>
      </View>
    )
  }

  if ((!isAndroid && !iosAdID) || (isAndroid && !andAdID)) {
    return (
      <View style={styles.errorView}>
        <Text style={styles.errorText}>
          Component Setup Incomplete. {isAndroid ? 'Android' : 'iOS'} Ad ID was
          left blank.
        </Text>
      </View>
    )
  }

  const adId = (isAndroid ? andAdID : iosAdID).replace(/\s/g, '')

  const [initializing, setInitializing] = useState(false)
  const [initialized, setInitialized] = useState(false)
  
  const loadInterstitial = () => {
    if (size !== 'interstitial') return

    const interstitial = InterstitialAd.createForAdRequest(adId, {
      requestNonPersonalizedAdsOnly: true,
    })
    interstitial.load()
  }

  useEffect(() => {
    if (initializing || initialized) return

    setInitializing(true)
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log(adapterStatuses)
        setInitialized(true)
        loadInterstitial()
      })
  })

  if (!initialized) {
    return (
      <View style={styles.errorView}>
        <Text style={styles.errorText}>Initializing...</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      {size !== 'interstitial' && !!adId && (
        <BannerAd
          unitId={adId}
          size={sizesMap[size]}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
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
