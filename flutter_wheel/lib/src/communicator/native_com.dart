
import 'package:flutter_wheel/src/communicator/stub_com.dart'
  if (dart.library.js) 'js_com.dart'
  if (dart.library.io) 'mobile_com.dart';

abstract class NativeCommunicator {
  factory NativeCommunicator(Function spinWheelFunc) {
    return getCommunicator(spinWheelFunc);
  }
}
