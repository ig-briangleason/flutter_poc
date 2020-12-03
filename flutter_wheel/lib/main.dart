import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_wheel/flutter_spinning_wheel.dart';
// import 'package:web_socket_channel/io.dart';

// import 'package:webview_flutter/webview_flutter.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setEnabledSystemUIOverlays([]);
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage()
    );
  }
}

// JavascriptChannel _receiveData(BuildContext context) {
//   return JavascriptChannel(
//      name: 'Barcode',
//      onMessageReceived: (JavascriptMessage message) {
//        print("Context: " + context.toString());
//        print("Message: " + message.toString());
//      });
// }

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(
            child: Container(
              color: Color(0xffB0F9D2),
              child: InkWell(
                  child: Center(child: Text('B A S I C')),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => Basic()),
                    );
                  }),
            ),
          ),
          Expanded(
            child: Container(
              color: Color(0xffDDC3FF),
              child: InkWell(
                  child: Center(child: Text('R O U L E T T E')),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => Roulette()),
                    );
                  }),
            ),
          ),
        ],
      ),
    );
  }

  Widget buildNavigationButton({String text, Function onPressedFn}) {
    return FlatButton(
      color: Color.fromRGBO(255, 255, 255, 0.3),
      textColor: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(50.0),
      ),
      onPressed: onPressedFn,
      child: Text(
        text,
        style: TextStyle(color: Colors.white, fontSize: 18.0),
      ),
    );
  }
}

class Basic extends StatelessWidget {
  final StreamController _dividerController = StreamController<int>();

  dispose() {
    _dividerController.close();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(backgroundColor: Color(0xffB0F9D2), elevation: 0.0),
      backgroundColor: Color(0xffB0F9D2),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SpinningWheel(
              Image.asset('assets/images/wheel-6-300.png'),
              width: 310,
              height: 310,
              initialSpinAngle: _generateRandomAngle(),
              spinResistance: 0.2,
              dividers: 6,
              onUpdate: _dividerController.add,
              onEnd: _dividerController.add,
            ),
            StreamBuilder(
              stream: _dividerController.stream,
              builder: (context, snapshot) =>
                  snapshot.hasData ? BasicScore(snapshot.data) : Container(),
            )
          ],
        ),
      ),
    );
  }

  double _generateRandomAngle() => Random().nextDouble() * pi * 2;
}

class BasicScore extends StatelessWidget {
  final int selected;

  final Map<int, String> labels = {
    1: 'Purple',
    2: 'Magenta',
    3: 'Red',
    4: 'Dark Orange',
    5: 'Light Orange',
    6: 'Yellow',
  };

  BasicScore(this.selected);

  @override
  Widget build(BuildContext context) {
    return Text('${labels[selected]}',
        style: TextStyle(fontStyle: FontStyle.italic));
  }
}

class Roulette extends StatelessWidget {
  final StreamController _dividerController = StreamController<int>();

  final _wheelNotifier = StreamController<double>();

  static const platform = const MethodChannel('com.flutter_wheel.channel');
  // final channel = IOWebSocketChannel.connect('ws://echo.websocket.org');

  

  dispose() {
    _dividerController.close();
    _wheelNotifier.close();
  }

  @override
  Widget build(BuildContext context) {
    platform.setMethodCallHandler(_receiveFromHost);

    // html.window.onMessage.listen((event) {

    //   print('Message Received' + event.toString());

    //   // do something with received data
    //   // myController.text = event.data; 

    //   // return a response
    //   event.ports[0].postMessage("response data");
    // });

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

  Future<void> _receiveFromHost(MethodCall call) async {
    print("Received Data From iOS");
    print(call);
    print(call.arguments);
    if (call.method == 'startstopwheel') {
      _wheelNotifier.sink.add(_generateRandomVelocity());
    } else {
      print("Unrecognized function" + call.method);
    }
  }
}

class RouletteScore extends StatelessWidget {
  final int selected;

  final Map<int, String> labels = {
    1: '1000\$',
    2: '400\$',
    3: '800\$',
    4: '7000\$',
    5: '5000\$',
    6: '300\$',
    7: '2000\$',
    8: '100\$',
  };

  RouletteScore(this.selected);

  @override
  Widget build(BuildContext context) {
    return Text('${labels[selected]}',
        style: TextStyle(fontStyle: FontStyle.italic, fontSize: 24.0));
  }
}
