import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { AdMobBanner } from 'react-native-admob'

class Ads extends Component {
	render() {
		let { andAdID, size } = this.props
		adID = andAdID.replace(/\s/g,'')
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
	}
})

export default Ads
