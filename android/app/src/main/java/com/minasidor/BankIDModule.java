package com.minasidor;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BankIDModule extends ReactContextBaseJavaModule {

    private final static String BANK_ID_PACKAGE_NAME = "com.bankid.bus";
    private final static String BANK_ID_URL = "bankid://www.bankid.com?redirect=null";
    private final static int REQUEST_CODE_BANK_ID = 3427;

    private ReactApplicationContext context;


    public BankIDModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "BankIDModule";
    }

    private Intent getBankIDIntent() {
        Intent intent = new Intent();
        intent.setPackage(BANK_ID_PACKAGE_NAME);
        intent.setAction(Intent.ACTION_VIEW);
        intent.addCategory(Intent.CATEGORY_BROWSABLE);
        intent.addCategory(Intent.CATEGORY_DEFAULT);
        intent.setData(Uri.parse(BANK_ID_URL));
        return intent;
    }

    @ReactMethod
    public void start() {
        context.startActivityForResult(getBankIDIntent(), REQUEST_CODE_BANK_ID, null);
    }
    
}
