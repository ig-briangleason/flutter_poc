import * as React from "react";
require("./styles.scss");

export class FlutterAnimation extends React.Component<{}, {}> {
  render() {
    return (
      <div className="flutter-container">
          Flutter
        <hr/>
          <iframe id="embeddedFlutter" className="embeddedFlutter" src='http://localhost:3000/flutter/#/' />

          {/* <div>
            <object id="embeddedFlutter" className="embeddedFlutter" type='text/html' data='http:localhost:3000/fllutter/#/' width='300px' height='800px' />
          </div> */}
      </div>
    );
  }
}
