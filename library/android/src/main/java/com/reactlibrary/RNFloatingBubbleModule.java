
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.os.Bundle;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.content.Intent;
import android.provider.Settings;
import android.net.Uri;

import com.txusballesteros.bubbles.BubbleLayout;
import com.txusballesteros.bubbles.BubblesManager;
import com.txusballesteros.bubbles.OnInitializedCallback;

public class RNFloatingBubbleModule extends ReactContextBaseJavaModule {

  private BubblesManager bubblesManager;
  private final ReactApplicationContext reactContext;
  private BubbleLayout bubbleView;

  public RNFloatingBubbleModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;

    // try {
    //   initializeBubblesManager();
    // } catch (Exception e) {

    // }
  }

  @ReactMethod
  public void reopenApp(){
    Intent launchIntent = reactContext.getPackageManager().getLaunchIntentForPackage(reactContext.getPackageName());
    if (launchIntent != null) {
      reactContext.startActivity(launchIntent);
    }
  }

  @Override
  public String getName() {
    return "RNFloatingBubble";
  }

  @ReactMethod // Notates a method that should be exposed to React
  public void showFloatingBubble(int x, int y, final Promise promise) {
    try {
      this.addNewBubble(x, y);
      promise.resolve("");
    } catch (Exception e) {
      promise.reject("");
    }
  }  

  @ReactMethod // Notates a method that should be exposed to React
  public void hideFloatingBubble(final Promise promise) {
    try {
      this.removeBubble();
      promise.resolve("");
    } catch (Exception e) {
      promise.reject("");
    }
  }  
  
  @ReactMethod // Notates a method that should be exposed to React
  public void requestPermission(final Promise promise) {
    try {
      this.requestPermissionAction(promise);
    } catch (Exception e) {
    }
  }  
  
  @ReactMethod // Notates a method that should be exposed to React
  public void checkPermission(final Promise promise) {
    try {
      promise.resolve(hasPermission());
    } catch (Exception e) {
      promise.reject("");
    }
  }  
  
  @ReactMethod // Notates a method that should be exposed to React
  public void initialize(final Promise promise) {
    try {
      this.initializeBubblesManager();
      promise.resolve("");
    } catch (Exception e) {
      promise.reject("");
    }
  }  

  private void addNewBubble(int x, int y) {
    this.removeBubble();
    bubbleView = (BubbleLayout) LayoutInflater.from(reactContext).inflate(R.layout.bubble_layout, null);
    bubbleView.setOnBubbleRemoveListener(new BubbleLayout.OnBubbleRemoveListener() {
      @Override
      public void onBubbleRemoved(BubbleLayout bubble) {
        bubbleView = null;
        sendEvent("floating-bubble-remove");
      }
    });
    bubbleView.setOnBubbleClickListener(new BubbleLayout.OnBubbleClickListener() {

      @Override
      public void onBubbleClick(BubbleLayout bubble) {
        sendEvent("floating-bubble-press");
      }
    });
    bubbleView.setShouldStickToWall(true);
    bubblesManager.addBubble(bubbleView, x, y);
  }

  private boolean hasPermission(){
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      return Settings.canDrawOverlays(reactContext);
    }
    return true;
  }

  private void removeBubble() {
    if(bubbleView != null){
      try{
        bubblesManager.removeBubble(bubbleView);
      } catch(Exception e){

      }
    }
  }


  public void requestPermissionAction(final Promise promise) {
    if (!hasPermission()) {
      Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + reactContext.getPackageName()));
      Bundle bundle = new Bundle();
      reactContext.startActivityForResult(intent, 0, bundle);
    } 
    if (hasPermission()) {
      promise.resolve("");
    } else {
      promise.reject("");
    }
  }

  private void initializeBubblesManager() {
    bubblesManager = new BubblesManager.Builder(reactContext).setTrashLayout(R.layout.bubble_trash_layout)
        .setInitializationCallback(new OnInitializedCallback() {
          @Override
          public void onInitialized() {
            // addNewBubble();
          }
        }).build();
    bubblesManager.initialize();
  }

  private void sendEvent(String eventName) {
    WritableMap params = Arguments.createMap();
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
  }
}