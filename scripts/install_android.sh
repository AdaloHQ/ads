#!/bin/bash
set -e
set -x

project_path=$(pwd) 
dir=$(dirname "${0}")

# parseJSON.js
appID=$(${dir}/parseJSON.js $project_path andAppIDGlobal)

# If App ID doesn't exist, silently fail. Error message will show on the component.
if [ -z "$appID" ]; then
  exit 0;
fi

sed -i.bak 's/^{/{\
  "react-native-google-mobile-ads": {\
    "android_app_id": "'$appId'"\
  },'/g $project_path/app.json
