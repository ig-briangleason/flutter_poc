@JS()
library javascript_bundler;

import 'package:flutter_wheel/src/communicator/native_com.dart';
import 'package:js/js.dart';

@JS('spinWheel')
external set _spinWheel(void Function(int) f);

class JSCommunicator implements NativeCommunicator {
  JSCommunicator(Function spinWheelFunc) {
    print("Using JS Com");
    _spinWheel = allowInterop(spinWheelFunc);
  }
}

NativeCommunicator getCommunicator(Function spinWheelFunc) => JSCommunicator(spinWheelFunc);
