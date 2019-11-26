package com.rn_wanandroid;
import android.widget.Toast;
import com.facebook.react.bridge.Callback; // 添加回调函数，需要导入这个包
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;// IllegalViewOperationException 需要导入包
import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public ToastModule(ReactApplicationContext reactContext) {
    super(reactContext);
    reactContext = reactContext;
  }

  @Override
  public String getName() { // ReactContextBaseJavaModule要求派生类实现getName方法。这个函数用于返回一个字符串名字，这个名字在 JavaScript 端标记这个模块
    return "ToastExample";
  }

  @Override
  public Map<String, Object> getConstants() {// 一个可选的方法getContants返回了需要导出给 JavaScript 使用的常量。它并不一定需要实现，但在定义一些可以被 JavaScript 同步访问到的预定义的值时非常有用。
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  /**
   * 要导出一个方法给 JavaScript 使用，Java 方法需要使用注解@ReactMethod。
   * 方法的返回类型必须为void。React Native 的跨语言访问是异步进行的，
   * 所以想要给 JavaScript 返回一个值的唯一办法是使用回调函数或者发送事件（参见下文的描述）。
   */
  @ReactMethod
  public void show(
      String message,
      int duration,
      Callback errorCallback,
      Callback successCallback) {
          try {
            Toast.makeText(getReactApplicationContext(), message + "(custom)", duration).show();
            successCallback.invoke(message, duration);
          } catch (IllegalViewOperationException  e) {
              //TODO: handle exception
              errorCallback.invoke(e.getMessage());
          }
    
  }
}