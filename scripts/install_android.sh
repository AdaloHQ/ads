#!/bin/bash
set -e
set -x

project_path=$(pwd) 
dir=$(dirname "${0}")

# parseJSON.js
appID=$(${dir}/parseJSON.js $project_path andAppID)
# If App ID doesn't exist, silently fail. Error message will show on the component.
if [ -z "$appID" ]; then
  exit 0;
fi

# AdMob Dependencies
yarn add react-native-admob@https://github.com/AdaloHQ/react-native-admob.git

# build.gradle
cd android/app

sed -i.bak '/dependencies {/a\
implementation "com.android.support:multidex:1.0.3"\
implementation "com.google.android.gms:play-services-ads:21.5.0"\
implementation "com.google.android.gms:play-services-base:18.2.0"\
implementation "com.google.firebase:firebase-core:21.1.1"\
implementation "com.google.firebase:firebase-messaging:23.1.2"\
implementation "androidx.work:work-runtime-ktx:2.7.1"
' build.gradle

# AndroidManifest
cd src/main
cat <<EOF > /tmp/adalo-sed
/com.facebook.react.devsupport/a\\
    <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${appID}"/>\\
EOF

sed -i.bak "$(cat /tmp/adalo-sed)" AndroidManifest.xml

echo $BUNDLE_ID
app_path=$(echo ${BUNDLE_ID} | sed -e 's/\./\//g')

# MainActivity
cd java/$app_path

sed -i.bak '/ReactActivity;/a\
import android.os.Bundle;\
import com.google.android.gms.ads.MobileAds;\
import com.google.android.gms.ads.initialization.InitializationStatus;\
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;
' MainActivity.java

sed -i.bak '/public class MainActivity extends ReactActivity {/a\
@Override\
protected void onCreate(Bundle savedInstanceState) {\
  super.onCreate(savedInstanceState);\
  MobileAds.initialize(this, new OnInitializationCompleteListener() {\
    @Override\
    public void onInitializationComplete(InitializationStatus initializationStatus) {\
    }\
  });\
}\
' MainActivity.java

echo "configured Android settings"
