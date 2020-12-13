import * as React from "react";
import { FlutterAnimation } from "../flutter";
require("./styles.scss");

interface FlutterWindow extends Window {
  spinWheel: (num: number) => void;
}

export default class HomePage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="home-page-container">
        <h1>IG starter kit running!</h1>
        <hr/>
        <button onClick={buttonClick}>Click to Spin</button>
        <FlutterAnimation />
      </div>
    );
  }
}

function buttonClick() {
  let element = document.getElementById('embeddedFlutter') as HTMLIFrameElement;
  const win = element.contentWindow as FlutterWindow;
  win.spinWheel(1012);
}
