#!/bin/bash
set -e
set -x

project_path=$(pwd) 
name=$PROJECT_NAME 
dir=$(dirname "${0}")

# parseJSON.js
appID=$(${dir}/parseJSON.js $project_path iosAppIDGlobal)

# If App ID doesn't exist, silently fail. Error message will show on the component.
if [ -z "$appID" ]; then
  exit 0;
fi

sed -i.bak 's/^{/{\
  "react-native-google-mobile-ads": {\
    "ios_app_id": "'$appID'"\
  },'/g $project_path/app.json

  echo "Successfully installed Adalo Ads"
