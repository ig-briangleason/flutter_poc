

import 'package:flutter/services.dart';
import 'package:flutter_wheel/src/communicator/native_com.dart';

class MobileCommunicator implements NativeCommunicator {
  static const platform = const MethodChannel('com.flutter_wheel.channel');
  Function _spinWheelFunc;
  MobileCommunicator(Function spinWheelFunc) {
    platform.setMethodCallHandler(_receiveFromHost);
    _spinWheelFunc = spinWheelFunc;
    print("Using Mobile Com");
  }

  Future<void> _receiveFromHost(MethodCall call) async {
    print("Received Data From iOS");
    print(call);
    print(call.arguments);
    if (call.method == 'startstopwheel') {
      _spinWheelFunc(call.arguments);
    } else {
      print("Unrecognized function" + call.method);
    }
  }
}

NativeCommunicator getCommunicator(Function spinWheelFunc) => MobileCommunicator(spinWheelFunc);
