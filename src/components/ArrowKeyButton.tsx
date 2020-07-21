import React, { RefObject } from 'react';
import ArrowKeyProps from '../interfaces/ArrowKeyProps';
import ReactHtmlParser from 'react-html-parser';
import KeyPressEventQueue from '../events/KeyPressEventQueue'
import ArrowKeyPress from '../interfaces/ArrowKeyPress';
import KeyPressType from '../enums/KeyPressType';

interface ArrowKeyButtonState {
  arrowColor: string
}

class ArrowsKeyButton extends React.Component<ArrowKeyProps, ArrowKeyButtonState> {

  arrowDivRef: RefObject<HTMLDivElement>;
  private static activeColor = "#FF0000";

  constructor(props: ArrowKeyProps) {
    super(props);
    this.state = {
      arrowColor: ""
    }
    this.arrowDivRef = React.createRef();
  }
  mouseDown() {
    if(this !== undefined) {
      KeyPressEventQueue.getInstance().stopRepeatingKeyPressEvents();
      let arrowKeyPress: ArrowKeyPress;
      arrowKeyPress = {
        type: KeyPressType.ARROW,
        code: this.props.code,
        dir: this.props.dir !== undefined ? this.props.dir : 0,
        active: true,
        id: this.props.keyId
      };
      this.setState({
        arrowColor: ArrowsKeyButton.activeColor,
      });
      KeyPressEventQueue.getInstance().pushRepeatingKeyPressEvent(arrowKeyPress, 100);
    }
  }
  mouseUp() {
    if(this !== undefined) {
      this.setState({
        arrowColor: ""
      });
    }
    KeyPressEventQueue.getInstance().stopRepeatingKeyPressEvents();
  }
  mouseLeave() {
    KeyPressEventQueue.getInstance().stopRepeatingKeyPressEvents();
    this.setState({arrowColor: ""});
  }
render() {
    return (<div
      id= {this.props.keyId}
      ref= {this.arrowDivRef}
      onTouchStart= { this.mouseDown.bind(this) }
      onTouchEnd= { this.mouseUp.bind(this) }
      onMouseLeave= {this.mouseLeave.bind(this) }
      onMouseDown= { this.mouseDown.bind(this) }
      onMouseUp= { this.mouseUp.bind(this) }
      className= "arrowsKeyPreview" 
      style= { Object.assign({ gridArea: this.props.position }, {cursor: "pointer"}, {color: this.state.arrowColor }) }>
      { ReactHtmlParser(this.props.symbol) }
    </div>);
  }
}

export default ArrowsKeyButton;