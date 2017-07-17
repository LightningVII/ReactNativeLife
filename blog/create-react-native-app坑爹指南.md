### unrecognized font family ionicons

### undefined is not an object (evaluating ImagePickerManager.showImagePicker)

我使用是 create-react-native-app 搭建的

ios 版本号 10.3
定位了一下问题，应该是这个，但不知道如何操作
iOS
In the XCode's "Project navigator", right click on your project's Libraries folder ➜ Add Files to <...>
Go to node_modules ➜ react-native-image-picker ➜ ios ➜ select RNImagePicker.xcodeproj
Add RNImagePicker.a to Build Phases -> Link Binary With Libraries
For iOS 10+, Add the NSPhotoLibraryUsageDescription, NSCameraUsageDescription, and NSMicrophoneUsageDescription(if allowing video) keys to your Info.plist with strings describing why your app needs these permissions. Note: You will get a SIGABRT crash if you don't complete this step
Compile and have fun


解决方案 

1. eject
2. Xcode 编辑 ios 中的项目 
3. Libraries
4. Build Phases
5. Info.plist