import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { AdMobBanner } from 'react-native-admob'

class Ads extends Component {
  render() {
    let {
      iosAdID,
      andAdID,
      size,
      iosAppIDGlobal,
      iosAppID,
      andAppIDGlobal,
      andAppID,
    } = this.props

    if (
      (Platform.OS === 'ios' && (!iosAppIDGlobal || !iosAppID)) ||
      (Platform.OS === 'android' && (!andAppIDGlobal || !andAppID))
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
    let adId
    if (Platform.OS === 'ios') {
      adId = iosAdID
    } else {
      adId = andAdID
    }
    adID = iosAdID.replace(/\s/g, '')
    return (
      <View style={styles.wrapper}>
        <AdMobBanner
          adSize={size}
          adUnitID={adID}
          onAdFailedToLoad={error => console.error(error)}
        />
      </View>
    )
  }
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
