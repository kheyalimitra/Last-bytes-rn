package com.camera;

import android.app.Application;

import com.facebook.react.ReactApplication;
//import com.benwixen.rnfilesystem.RNFileSystemPackage;
//import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
//import com.benwixen.rnfilesystem.RNFileSystemPackage;
//import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
//import com.rntensorflow.RNTensorFlowPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rnfs.RNFSPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
//            new RNFileSystemPackage(),
//            new RNFileViewerPackage(),
//            new RNFileSystemPackage(),
//            new RNFileViewerPackage(),
//            new RNTensorFlowPackage(),
             new RNCameraPackage(),
             new RNFSPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
