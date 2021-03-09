import React, { Component } from 'react'
import stdAd from './adPics/stdAd.png'
import largeAd from './adPics/largeAd.png'
import recAd from './adPics/recAd.png'
import interAd from './adPics/interAd.png'

class Ads extends Component {
  render() {
    const { size, placeholder, editor } = this.props
    let height = 250
    let width = 300
    let image = recAd
    if (size == 'banner') {
      height = 50
      width = 320
      image = stdAd
    } else if (size == 'largeBanner') {
      height = 100
      width = 320
      image = largeAd
    } else if (size == 'interstitial') {
      height = 600
      width = 375
      image = interAd
    }
    let realStyles = {
      wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width,
      },
      image: {
        height: height,
        width: width,
      },
    }

    return (
      <div style={realStyles.wrapper}>
        {(placeholder || editor) && (
          <img style={realStyles.image} src={image} />
        )}
      </div>
    )
  }
}

export default Ads
