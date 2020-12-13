@JS()
library javascript_bundler;

import 'dart:async';
import 'dart:math';

import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:js/js.dart';

import 'roulette_score.dart';
import 'spinning_wheel.dart';

@JS('spinWheel')
external set _spinWheel(void Function(int) f);
class Roulette extends StatelessWidget {

  final StreamController _dividerController = StreamController<int>();

  final _wheelNotifier = StreamController<double>();

  static const platform = const MethodChannel('com.flutter_wheel.channel');

  dispose() {
    _dividerController.close();
    _wheelNotifier.close();
  }

  @override
  Widget build(BuildContext context) {
      _spinWheel = allowInterop(spinWheelFunc);
    platform.setMethodCallHandler(_receiveFromHost);

    return Scaffold(
      appBar: AppBar(backgroundColor: Color(0xffDDC3FF), elevation: 0.0),
      backgroundColor: Color(0xffDDC3FF),
      body: 
      Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SpinningWheel(
              Image.asset('assets/images/roulette-8-300.png'),
              width: 310,
              height: 310,
              initialSpinAngle: _generateRandomAngle(),
              spinResistance: 0.01,
              canInteractWhileSpinning: false,
              dividers: 8,
              onUpdate: _dividerController.add,
              onEnd: _dividerController.add,
              secondaryImage:
                  Image.asset('assets/images/roulette-center-300.png'),
              secondaryImageHeight: 110,
              secondaryImageWidth: 110,
              shouldStartOrStop: _wheelNotifier.stream,
            ),
            SizedBox(height: 30),
            StreamBuilder(
              stream: _dividerController.stream,
              builder: (context, snapshot) =>
                  snapshot.hasData ? RouletteScore(snapshot.data) : Container(),
            ),
            SizedBox(height: 30),
            new RaisedButton(
              child: new Text("Start"),
              onPressed: () =>
                  _wheelNotifier.sink.add(_generateRandomVelocity()),
            )
          ],
        ),
      ),
    );
  }

  double _generateRandomVelocity() => (Random().nextDouble() * 6000) + 2000;

  double _generateRandomAngle() => Random().nextDouble() * pi * 2;

  void spinWheelFunc(int prizeID) {
    print("Prize ID" + prizeID.toString());
    _wheelNotifier.sink.add(_generateRandomVelocity());
  }

  Future<void> _receiveFromHost(MethodCall call) async {
    print("Received Data From iOS");
    print(call);
    print(call.arguments);
    if (call.method == 'startstopwheel') {
      spinWheelFunc(call.arguments);
    } else {
      print("Unrecognized function" + call.method);
    }
  }
}
