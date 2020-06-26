import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'

class Ads extends Component {
	render() {
		const { size } = this.props
		let height, width
		if (size == 'banner'){
			height = 50
			width = 320
		}
		else if (size == 'largeBanner'){
			height = 100
			width = 320
		}
		else{
			height = 250
			width = 300
		}
		let realStyles = {
			wrapper: {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderColor: 'black',
				borderWidth: 2,
				backgroundColor: '#e0e0e0',
				height: height,
				width: width
			}
		}
		return (
			<View style={realStyles.wrapper}>
				<Text>Banner</Text>
			</View>
		)
	}
}

export default Ads
