---
title: 'Introduction to React Native'
type: 'topic'
section: '01 Basics'
course: 'React Native'
tags:
- java
---
#### What is React Native
- React Native is an open-source UI framework on top of React.js that uses JavaScript to build a native mobile app.

##### Prerequisites
1. JavaScript
2. React
3. JSX
4. Thinking like a mobile developer ;)

##### Benefits
1. Cross-platform: It builds native mobile apps for iOS and Android with same code.
2. Dynamic Updates: Updates apps in a matter of seconds.
3. Hybrid Apps: Combine native components and apps with React Native.
4. Hot Reloading.

---
#### Native vs React Native

|Native App Development  |React Native Development   |
|---|---|
|Objective-C/Swift for iOS and Java for Android   |JavaScript using React for both iOS and Android   |
|Multiple code bases and multiple teams   |One codebase and one team   |
|Slower development   |Faster development and easy to debug   |
|Knowledge of either iOS or Android required |Knowledge of React required |

---
#### How React Native works
- We code app using JavaScript and compose components using a suite of components provided to you by React Native. 
- Then it goes through a build process. 
- React Native packager, in the form of a terminal process, hangs around in the background and monitors your project for file changes. 
- It then compiles those files into a plain JavaScript package using webpack.
- In the meanwhile, it will install app on iOS or Android in a Simulator or actual device. 
- This app talk to your react native packager, which notifies it that there is a new bundle for it to download and run.
- React Native code downloads this bundle and loads it into a JavaScript engine where it executes it.
- In JavaScriptCore, the JS engine, it loads up the component, calls a render, and it builds up a tree of components.
- It then talks through a bridge with the native app where it programmatically lays out your View using native components for the platform it's currently running on, iOS or Android.

---
#### Third party libraries
1. React Native Camera
2. React Native Fingerprint Scanner
3. React Native Touch ID
3. react-native-video
4. React Navigation

---
#### Deployments
1. Over The Air (OTA) using CODEPUSH
2. Native Updates using FASTLANE to App Store and Google Play Store

##### Fastlane
- Automated app-store deployment on iOS and Android.
- Capture Screenshots
- Code Signing
- Distributed Beta builds

##### Beta Deployments
1. TestFlight (iOS)
2. Google Play or Crashlytics (Android)

---