import UIKit
import Flutter
import FlutterPluginRegistrant

@UIApplicationMain
class AppDelegate: FlutterAppDelegate {
    
    var flutterEngine : FlutterEngine?;
    
    override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        self.flutterEngine = FlutterEngine(name: "io.flutter", project: nil);
        self.flutterEngine?.run(withEntrypoint: nil);
        GeneratedPluginRegistrant.register(with: self.flutterEngine!);
        
        if let rootViewController : FlutterViewController = window?.rootViewController as? FlutterViewController {
            let channelName = "com.flutter_wheel.channel"
            let methodChannel = FlutterMethodChannel(name: channelName, binaryMessenger: rootViewController.binaryMessenger)

            methodChannel.invokeMethod("didRecieveTranscript", arguments: 100)
        }

        
        return super.application(application, didFinishLaunchingWithOptions: launchOptions);
    }

}


////
////  AppDelegate.swift
////  poc_flutter_integration
////
////  Created by Brian Gleason on 11/28/20.
////
//
//import UIKit
//
//@main
//class AppDelegate: UIResponder, UIApplicationDelegate {
//
//
//
//    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
//        // Override point for customization after application launch.
//        return true
//    }
//
//    // MARK: UISceneSession Lifecycle
//
//    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
//        // Called when a new scene session is being created.
//        // Use this method to select a configuration to create the new scene with.
//        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
//    }
//
//    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
//        // Called when the user discards a scene session.
//        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
//        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
//    }
//
//
//}
//

