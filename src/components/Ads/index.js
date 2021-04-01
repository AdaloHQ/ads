import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { AdMobBanner } from 'react-native-admob'

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

  const logError = error => {
    console.error('Error loading ad!', error)
  }

  const [adID, setAdID] = useState('')

  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (iosAdID) setAdID(iosAdID.replace(/\s/g, ''))
    } else if (Platform.OS === 'android') {
      if (andAdID) setAdID(andAdID.replace(/\s/g, ''))
    }
  }, [Platform.OS, iosAdID, andAdID])

  return (
    <View style={styles.wrapper}>
      {!!adID && (
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
