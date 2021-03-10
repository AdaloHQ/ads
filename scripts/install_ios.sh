#!/bin/bash
set -e
set -x

project_path=$(pwd) 
name=$PROJECT_NAME 
dir=$(dirname "${0}")

# parseJSON.js
appID=$(${dir}/parseJSON.js $project_path iosAppID)

# If App ID doesn't exist, silently fail. Error message will show on the component.
if [ -z "$appID" ]; then
  exit 0;
fi

# AdMob Dependencies
yarn add react-native-admob@^2.0.0-beta.6

# Frameworks
curl https://dl.google.com/googleadmobadssdk/googlemobileadssdkios.zip -O -J -L
unzip googlemobileadssdkios.zip
for direct in */; do
  if [[ $direct = Google* ]];
  then
    if [[ -d $(echo $direct/GoogleMobileAds.xcframework | tr -s /) ]]; then
      echo "Moving XC Framework into the correct folder."
      cp -R $(echo $direct/GoogleMobileAds.xcframework | tr -s /) ios/GoogleMobileAds.xcframework
    fi;
    if [[ -d "$(echo $direct/GoogleMobileAds.framework | tr -s /)" ]]; then
      echo "Moving Framework into the correct folder."
      cp -R $(echo $direct/GoogleMobileAds.framework | tr -s /) ios/GoogleMobileAds.framework
    fi;
  fi;
done

# Podfile
cd ios

if ! grep -q "marketplace" "Podfile"; then
  sed -i.bak '/marketplace/a\
  \  pod "Google-Mobile-Ads-SDK" 
  ' Podfile
else
  sed -i.bak '/RNCPushNotificationIOS/a\
  \  pod "Google-Mobile-Ads-SDK" 
  ' Podfile
fi

# AppDelegate.m
cd $name

sed -i.bak '/UserNotifications.h/a\
  @import GoogleMobileAds;
' AppDelegate.m


# sed -i.bak '/center.delegate = self;/i\
# GADMobileAds.sharedInstance().start(completionHandler: nil)
# ' ./TavoloRestaurant/AppDelegate.m


# info.plist
plutil -insert GADApplicationIdentifier -string $appID info.plist

# echo "configured iOS settings"