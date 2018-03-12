echo "This is for build step"

export ANDROID_HOME="/opt/android-sdk-linux"
export PATH="$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH"


cd android && ./gradlew assembleRelease

pwd