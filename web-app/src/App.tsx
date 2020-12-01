import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello World, let's spin a wheel
      </header>
      <div className="flutter-div">
        Hello iFrame
        <iframe className="flutter-iframe" src="http://localhost:50684/index.html#/" />
        {/* <script src="../flutter_wheel/build/web/main.dart.js" type="application/javascript"></script> */}
      </div>
    </div>
  );
}

export default App;
