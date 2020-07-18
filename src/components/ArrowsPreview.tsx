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

let UP: ArrowKeyPress = { code: 38, dir: 0b1000, active: false, id: "upArrowKey", type: KeyPressType.ARROW};
let DOWN: ArrowKeyPress = { code: 40, dir: 0b0100, active: false, id: "downArrowKey", type: KeyPressType.ARROW };
let LEFT: ArrowKeyPress = { code: 37, dir: 0b0010, active: false, id: "leftArrowKey", type: KeyPressType.ARROW };
let RIGHT: ArrowKeyPress = { code: 39, dir: 0b0001, active: false, id: "rightArrowKey", type: KeyPressType.ARROW };
let NW: ArrowKeyPress = { dir: 0b1010, active: false, id: "nwArrowKey", type: KeyPressType.ARROW };
let NE: ArrowKeyPress = { dir: 0b1001, active: false, id: "neArrowKey", type: KeyPressType.ARROW };
let SW: ArrowKeyPress = { dir: 0b0110, active: false, id: "swArrowKey", type: KeyPressType.ARROW };
let SE: ArrowKeyPress = { dir: 0b0101, active: false, id: "seArrowKey", type: KeyPressType.ARROW };
let SPACE: ArrowKeyPress = { code: 32, dir: 0, active: false, id: "spaceKey", type: KeyPressType.SPACE };

const directions = [UP, LEFT, DOWN, RIGHT];
const allDirections = [UP, LEFT, DOWN, RIGHT, NW, NE, SW, SE];

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
        let direction = 0b0000;
        directions.forEach(keyPress => {
          if (keyPress.code === e.keyCode) {
            keyPress.active = (e.type === "keydown");
          }
          if (keyPress.active) {
            direction |= keyPress.dir;
          }
        });
        allDirections.forEach(element => {
          handleKeyboardEvent(element, element.dir === direction);
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