#!/bin/bash
set -e
set -x

project_path=$(pwd) 
dir=$(dirname "${0}")

# parseJSON.js
appID=$(${dir}/parseJSON.js $project_path andAppID)

# AdMob Dependencies
yarn add react-native-admob@^2.0.0-beta.6

# build.gradle
cd android/app

# sed -i.bak '
# /implementation "com.google.android.gms:play-services-base:16.1.0"/d
# ' build.gradle

# sed -i.bak '
# /implementation "com.google.firebase:firebase-core:16.0.9"/d
# ' build.gradle

# sed -i.bak '
# /implementation "com.google.firebase:firebase-messaging:18.0.0"/d
# ' build.gradle

sed -i.bak '/dependencies {/a\
implementation "com.android.support:multidex:1.0.3"\
implementation "com.google.android.gms:play-services-ads:19.6.0"\
implementation "com.google.android.gms:play-services-base:17.5.0"\
implementation "com.google.firebase:firebase-core:18.0.0"\
implementation "com.google.firebase:firebase-messaging:21.0.0"
' build.gradle

#sed -i.bak '/defaultConfig {/a\
#multiDexEnabled true
#' build.gradle

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