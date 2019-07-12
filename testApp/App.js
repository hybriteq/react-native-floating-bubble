/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  ToastAndroid,
  DeviceEventEmitter
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { showFloatingBubble, hideFloatingBubble, requestPermission } from "react-native-floating-bubble"

const showToast = text => ToastAndroid.show(text, 1000)

const App = () => {
  const onAdd = () => showFloatingBubble().then(() => showToast("Add Floating Button"))
  const onHide = () => hideFloatingBubble().then(() => showToast("Manually Removed Bubble")).catch(() => showToast("Failed to remove"))
  const onRequestPermission = () => requestPermission().then(() => showToast("Permission received")).catch(() => showToast("Failed to get permission"))
  useEffect(() => {
    const subscriptionPress = DeviceEventEmitter.addListener("floating-bubble-press", function (e) {
      showToast("Press Bubble")
    });
    const subscriptionRemove = DeviceEventEmitter.addListener("floating-bubble-remove", function (e) {
      showToast("Remove Bubble")
    });
    return () => {
      subscriptionPress.remove();
      subscriptionRemove.remove();
    }
  }, [])
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <Button style={styles.button} title="Add Bubble" onPress={onAdd} />
          <Button style={styles.button}  title="Hide Bubble" onPress={onHide} />
          <Button style={styles.button}  title="Get Permission" onPress={onRequestPermission} />
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  button: {
    margin: 30
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
