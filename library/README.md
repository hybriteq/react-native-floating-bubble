
# react-native-floating-bubble

## Getting started

`$ npm install react-native-floating-bubble --save`

### Mostly automatic installation

`$ react-native link react-native-floating-bubble`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-floating-bubble` and add `RNFloatingBubble.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNFloatingBubble.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNFloatingBubblePackage;` to the imports at the top of the file
  - Add `new RNFloatingBubblePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-floating-bubble'
  	project(':react-native-floating-bubble').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-floating-bubble/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-floating-bubble')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNFloatingBubble.sln` in `node_modules/react-native-floating-bubble/windows/RNFloatingBubble.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Floating.Bubble.RNFloatingBubble;` to the usings at the top of the file
  - Add `new RNFloatingBubblePackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNFloatingBubble from 'react-native-floating-bubble';

// TODO: What to do with the module?
RNFloatingBubble;
```
  