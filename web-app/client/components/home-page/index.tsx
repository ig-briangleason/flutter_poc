import * as React from "react";
import { FlutterAnimation } from "../flutter";
require("./styles.scss");

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
  let element = document.getElementById('embeddedFlutter');

  let ele: HTMLIFrameElement = element as HTMLIFrameElement;
  ele.contentWindow?.postMessage("Test Message From Parent", "/");
  ele.contentWindow?.postMessage("spinWheel", "/");
  const win: any = ele.contentWindow;
  win.spinWheel();
  console.log('element: ', ele.contentWindow);
  // let somet = element?.contentDocument
  // wn.postMessage('Hello to iframe from parent!', 'http://www.example.com');

}
