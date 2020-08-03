import React, { Component } from "react";
import { View, Image } from "react-native";
import stdAd from "./adPics/stdAd.png";
import largeAd from "./adPics/largeAd.png";
import recAd from "./adPics/recAd.png";

class Ads extends Component {
  render() {
    const { size, placeholder, editor } = this.props;
    let height = 250;
    let width = 300;
    let image = recAd;
    if (size == "banner") {
      height = 50;
      width = 320;
      image = stdAd;
    } else if (size == "largeBanner") {
      height = 100;
      width = 320;
      image = largeAd;
    }
    let realStyles = {
      wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: height,
        width: width,
      },
      image: {
        height: height,
        width: width,
      },
    };
    return (
      <div style={realStyles.wrapper}>
        {(placeholder || editor) && (
          <img style={realStyles.image} src={image} />
        )}
      </div>
    );
  }
}

export default Ads;
