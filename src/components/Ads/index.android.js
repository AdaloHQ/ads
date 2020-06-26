import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { AdMobBanner,
	AdMobInterstitial,
	PublisherBanner,
	AdMobRewarded, } from 'react-native-admob'

class Ads extends Component {
	// inter = () => {
	// 	let  { adID } = this.props
	// 	adID = adID.replace(/\s/g,'')
	// 	AdMobInterstitial.setAdUnitID(adID);
	// 	AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
	// }
	// reward = () => {
	// 	let  { adID } = this.props
	// 	adID = adID.replace(/\s/g,'')
	// 	AdMobRewarded.setAdUnitID(adID);
	// 	AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
	// }
	render() {
		let { andAdID, size } = this.props
		adID = andAdID.replace(/\s/g,'')
		return (
			<View style={styles.wrapper}>
				<AdMobBanner
					adSize={size}
					adUnitID={adID}
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
	}
})

export default Ads
