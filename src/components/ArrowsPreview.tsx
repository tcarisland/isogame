import React from 'react';
import ArrowKeyButton from './ArrowKeyButton';
import ArrowKeyPress from '../interfaces/ArrowKeyPress';
import ArrowKeyProps from '../interfaces/ArrowKeyProps';
import KeyPressEventQueue from '../events/KeyPressEventQueue';
import ArrowKeyButtons from '../resources/ArrowKeyButtons.json';
import KeyPressType from '../enums/KeyPressType';

interface ArrowsPreviewProps {
  side: number;
}

/**
nw = n
n = ne
ne = e
e = se
se = s
s = sw
sw = w
w = nw
10
8
9
1
5
4
6
2
 */

let NW: ArrowKeyPress = { dir: 2, ndir: 10, active: false, id: "nwArrowKey", type: KeyPressType.ARROW };
let N: ArrowKeyPress = { dir: 10, ndir: 8, code: 38, active: false, id: "upArrowKey", type: KeyPressType.ARROW};
let NE: ArrowKeyPress = { dir: 8, ndir: 9, active: false, id: "neArrowKey", type: KeyPressType.ARROW };
let E: ArrowKeyPress = { dir: 9, ndir: 1, code: 39, active: false, id: "rightArrowKey", type: KeyPressType.ARROW };
let SE: ArrowKeyPress = { dir: 1, ndir: 5, active: false, id: "seArrowKey", type: KeyPressType.ARROW };
let S: ArrowKeyPress = { dir: 5, ndir: 4, code: 40, active: false, id: "downArrowKey", type: KeyPressType.ARROW };
let SW: ArrowKeyPress = { dir: 4, ndir: 6, active: false, id: "swArrowKey", type: KeyPressType.ARROW };
let W: ArrowKeyPress = { dir: 6, ndir: 2, code: 37, active: false, id: "leftArrowKey", type: KeyPressType.ARROW };
let SPACE: ArrowKeyPress = { dir: 0, ndir: 0, code: 32, active: false, id: "spaceKey", type: KeyPressType.SPACE };

const directions = [N, W, S, E];
const allDirections = [N, W, S, E, NW, NE, SW, SE];

class ArrowsPreview extends React.Component<ArrowsPreviewProps> {
  componentDidMount() {
    const keyListener = function(e: KeyboardEvent) {

      function handleKeyboardEvent(keyPress: ArrowKeyPress, keyDown: boolean) {
        let keyButton = document.getElementById(keyPress.id);
        let color = keyDown ? "red" : "black";
        if (keyButton != null) {
          keyButton.style.color = color;
        }
        if (keyDown) {
          KeyPressEventQueue.getInstance().pushKeyPressEvent(keyPress);
        }
      }

      if (SPACE.code === e.keyCode) {
        handleKeyboardEvent(SPACE, (e.type === "keydown"));
        KeyPressEventQueue.getInstance().pushKeyPressEvent(SPACE);
      } else {
        let naturalDirection = 0b0000;
        directions.forEach(keyPress => {
          if (keyPress.code === e.keyCode) {
            keyPress.active = (e.type === "keydown");
          }
          if (keyPress.active) {
            naturalDirection |= keyPress.ndir;
          }
        });
        allDirections.forEach(element => {
          handleKeyboardEvent(element, element.ndir === naturalDirection);
        });
      }
    };
    document.addEventListener("keydown", keyListener, false);
    document.addEventListener("keyup", keyListener, false);
  }
  render() {
    const arrowsPreviewStyle = Object.assign({ width: this.props.side + "px" }, { height: this.props.side + "px" });
    return (<div className="arrowsPreview" style={arrowsPreviewStyle}>
      {
        ArrowKeyButtons.map((element) => React.createElement(ArrowKeyButton, element as ArrowKeyProps, null))
      }
    </div>);
  }
}

export default ArrowsPreview;