package com.minasidor;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BankIDPackage implements ReactPackage {

    private BankIDModule bankIDModule;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        bankIDModule = new BankIDModule(reactContext);

        List<NativeModule> modules = new ArrayList<>();

        modules.add(bankIDModule);

        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
