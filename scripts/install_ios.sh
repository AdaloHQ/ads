#!/bin/bash
set -e
set -x

name=$PROJECT_NAME

# install_ios.js
node install_ios.js

# Frameworks
cp -R ../GoogleMobileAds.framework ../../template-app/ios

# AdMob Dependencies
cd ../../template-app

yarn add react-native-admob@^2.0.0-beta.6
# yarn add ads@../ads

# Podfile
cd ios

sed -i.bak '/use_native_modules/a\
  pod "Google-Mobile-Ads-SDK" 
' Podfile

pod install --repo-update

# AppDelegate.m
sed -i.bak '/UserNotifications.h/a\
  @import GoogleMobileAds;
' ./TavoloRestaurant/AppDelegate.m

# sed -i.bak '/center.delegate = self;/i\
# GADMobileAds.sharedInstance().start(completionHandler: nil)
# ' ./TavoloRestaurant/AppDelegate.m

echo "configured iOS settings"