#!/bin/bash
set -e
set -x

project_path=$(pwd) 
name=$PROJECT_NAME 
dir=$(dirname "${0}")

# install_ios.js
yarn add json-easy-filter --dev
appID=$(${dir}/install_ios.js $project_path)

# Frameworks
cp -R ${dir}/GoogleMobileAds.framework ../ios

# AdMob Dependencies
yarn add react-native-admob@^2.0.0-beta.6

# Podfile
cd ios

sed -i.bak '/use_native_modules/a\
  pod "Google-Mobile-Ads-SDK" 
' Podfile

pod install --repo-update

# AppDelegate.m
cd $name

sed -i.bak '/UserNotifications.h/a\
  @import GoogleMobileAds;
' AppDelegate.m


# sed -i.bak '/center.delegate = self;/i\
# GADMobileAds.sharedInstance().start(completionHandler: nil)
# ' ./TavoloRestaurant/AppDelegate.m


# info.plist
plutil -remove GADApplicationIdentifier info.plist
plutil -insert GADApplicationIdentifier -string $appID info.plist

# echo "configured iOS settings"