package com.dmonster.crewonly;

import com.facebook.react.ReactActivity;

import android.os.Bundle;
//import org.devio.rn.splashscreen.SplashScreen;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import java.security.MessageDigest;
import android.util.Base64;
import android.util.Log;

public class MainActivity extends ReactActivity {

  // @Override
  // protected void onCreate(Bundle savedInstanceState) {
  //   super.onCreate(savedInstanceState);
  //   SplashScreen.show(this, R.style.SplashScreenTheme);
    
  //   /*try {
  //     PackageInfo info = getPackageManager().getPackageInfo(getPackageName(), PackageManager.GET_SIGNATURES);
  //     for (Signature signature : info.signatures) {
  //       MessageDigest md;
  //       md = MessageDigest.getInstance("SHA");
  //       md.update(signature.toByteArray());
  //       String something = new String(Base64.encode(md.digest(), 0));
  //       Log.d("KeyHash", something);
  //     }
  //   } catch (Exception e) {
  //     // TODO Auto-generated catch block
  //     Log.e("name not found", e.toString());
  //   }*/
  // }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "crewonly";
  }
}
