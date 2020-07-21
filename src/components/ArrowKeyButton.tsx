import React from 'react';
import ArrowKeyProps from '../interfaces/ArrowKeyProps';
import ReactHtmlParser from 'react-html-parser';

class ArrowsKeyButton extends React.Component<ArrowKeyProps> {
  arrowKeyClicked() {
    if(this !== undefined) {
      console.log(this.props.keyId + "clicked");
      console.log(this.props);
    }
  }
render() {
    return (<div
      id={this.props.keyId}
      onClick={this.arrowKeyClicked.bind(this)}
      className="arrowsKeyPreview" 
      style={Object.assign({ gridArea: this.props.position }, {cursor: "pointer"})}>
      {ReactHtmlParser(this.props.symbol)}
    </div>);
  }
}

export default ArrowsKeyButton;