# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'wheel_poc' do
  use_frameworks!

  #pod 'Flutter', :podspec => '../flutter-spinning-wheel-master/ios/Flutter/Flutter.podspec'

  # Pods for BMI Calculator
  flutter_application_path = '../flutter-spinning-wheel-master/build/wheel_module'
  load File.join(flutter_application_path, '.ios', 'Flutter', 'podhelper.rb')

  install_all_flutter_pods(flutter_application_path)
  
end