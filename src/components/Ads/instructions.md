**Google AbMob**

**1) Create a Google AdMob Account**  
Navigate to the link below to either set up or sign into your AdMob account:  
https://admob.google.com/home/

Please note that it normally takes a few days for the request to fully go through and be approved - make sure you've recieved an email that confirms your account is ready to go. If the account isn't fully approved, your ads won't work.


**2) Configure your iOS AdMob App**  
Navigate to the "Apps" section of the side panel and click "Add App." When asked if your app has been published, click no. Enter your app name and decide whether to enable user metrics. You will also be prompted to select whether your app is iOS or Android. **Because the AdMob interface differs depending on the platform, you will have to create one version for iOS and one version for Android.** Select iOS for now. Copy the App ID and paste it into the left panel in Adalo for your AdMob component under "AdMob iOS App ID."


**3) Configure your Android AdMob App**  
Repeat step 2 to create another app, but this time select Android instead of iOS. Copy the App ID and paste it under "AdMob Android App ID." Ensure that your iOS and Android App IDs are different. 


**4) Add Ad Units**  
Navigate to the "Ad Units" section of your iOS app. Click "Add Ad Unit" and select "Banner" when prompted for a type. Copy the Ad ID and paste it under "AdMob iOS Ad ID." Repeat this process for the Android App and paste the Ad ID under "AdMob Android Ad ID."

Repeat this step for all ads you want to include in your app. Each Adalo AdMob component should have a distinct pair of Ad IDs, but the same pair of App IDs. Keep in mind that it usually takes up to an hour for AdMob to fully process the new Ad Unit request. 


**5) Customize your Banner**  
On the Adalo side panel, designate the size of your ad by picking Standard, Large, or Medium Rectangle. You don't need to do anything with your AdMob account - just select your preferred option!


**6) Publish your Apps**  
**Once your Adalo app is published,** go back to your AdMob account and navigate to each app's "App Settings." Link the iOS version to your app in the App Store and the Android version to your app in Google Play.


**Checklist/Best Practices:**  
Make sure to check that all the App and Ad IDs are entered correctly on your Adalo component! There is no way for Adalo to validate the entered information because we don't have access to your account and the ads only fully take effect once the app is published. Double check that the correct information is in the correct fields.

Don't mix up the Adalo components's iOS and Android fields. AdMob works differently depending on the platform, so mixing up information won't work.

Make sure the iOS and Android versions of each AdMob app are identical. Each pair should have the same number of Ad Units. 

Don't use the same Ad ID more than once - each ID is only meant to be used once. For each new ad, create a new Ad Unit. 

Make sure every AdMob component has the same App IDs - you only need to create 2 AdMob Apps for each Adalo app.

Don't forget to publish your AdMob apps once your Adalo app has been launched. If you don't publish your apps, your app will display test ads!
