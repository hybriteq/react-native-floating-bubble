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

import { showFloatingBubble } from "react-native-floating-bubble"

const showToast = text => ToastAndroid.show(text, 1000)

const App = () => {
  const onAdd = () => showFloatingBubble().then(v => showToast("Add Floating Button"))
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
          <Button title="Add Bubble" onPress={onAdd} />
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
  highlight: {
    fontWeight: '700',
  },
});

export default App;
