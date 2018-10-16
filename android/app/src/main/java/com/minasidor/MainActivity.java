package com.minasidor;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity {

    private final static int REQUEST_CODE_BANK_ID = 3427;
    private final static String BANKID_RESPONSE_KEY= "BANKID_RESPONSE_KEY";

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "minasidor";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_BANK_ID) {
            sendBankIDEventToJS();
        }
    }

    private void sendBankIDEventToJS() {
        ReactContext reactContext = getReactNativeHost().getReactInstanceManager().getCurrentReactContext();

        WritableMap params = Arguments.createMap();

        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(BANKID_RESPONSE_KEY, params);
    }
}
