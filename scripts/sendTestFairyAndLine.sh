

APP_PROJECT="NoteTaker"
TESTFAIRY_RESULT_PATH="$APP_PROJECT/testfairy.json"

rm -rf $APP_PROJECT
mkdir $APP_PROJECT


curl https://dmp-egg.testfairy.com/api/upload -o $TESTFAIRY_RESULT_PATH \
-F api_key='69ee7182d0eb73ab60296edbbd86a63d40fba900' \
-F file=@"/var/lib/jenkins/workspace/noteTakerAndroidBuild/android/app/build/outputs/apk/app-release.apk" \
-F metrics='cpu,network,logcat' \
-F options='shake' \
-F notify='off' \
-F auto-update='off' \

cat $TESTFAIRY_RESULT_PATH
APP_VERSION=$(cat $TESTFAIRY_RESULT_PATH | jq '.app_version' | tr -d '"')
APP_URL=$(cat $TESTFAIRY_RESULT_PATH | jq '.instrumented_url' | tr -d '\"')


LINE_KEY_HYBRID_DEV_PO="G60WyLntsVoy5b6OVCt4dPw4ITBrpi5gJPog78YxCzP"

LINE_POST_URL="https://notify-api.line.me/api/notify"

cd /var/lib/jenkins/workspace/noteTakerAndroidBuild/android/app/build/outputs/apk/
GIT_BRANCH="$(git name-rev --name-only HEAD)"


echo $GIT_BRANCH

NOW=$(TZ="GMT-7" date +"%r %a %d %h %y")


LINE_MESSAGE=" -> Android
App Name: $APP_PROJECT
App version: $APP_VERSION
Build version: $BUILD_NUMBER
Branch: $GIT_BRANCH
Date: $NOW"
if ! [ -z "$APP_URL" ]; then
LINE_MESSAGE="$LINE_MESSAGE
Download: $APP_URL"
	qrcodeName="QRcode_Download_app"
	qrencode -o ./$qrcodeName.png $APP_URL
	curl -X POST -H "Authorization: Bearer $LINE_KEY_HYBRID_DEV_PO" -F "message=$LINE_MESSAGE" "$LINE_POST_URL" -F "imageFile=@./$qrcodeName.png"
fi
