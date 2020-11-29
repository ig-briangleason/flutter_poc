//
//  ViewController.swift
//  poc_flutter_integration
//
//  Created by Brian Gleason on 11/28/20.
//

import UIKit
import Flutter

class ViewController: UIViewController {
    
    var channel: FlutterMethodChannel?
    
    @IBAction func spinButton(_ sender: Any) {
        print("Button Press")

        DispatchQueue.main.async {
            self.channel!.invokeMethod("startstopwheel", arguments: 100)
        }
//        channel!.invokeMethod("_receiveFromHost", arguments: 100)

    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "flutter_vc_segue" {
            if let vc = segue.destination as? FlutterViewController {
                self.channel = FlutterMethodChannel(name: "com.flutter_wheel.channel", binaryMessenger: vc.binaryMessenger)
                print("Channel Assigned")
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
}
