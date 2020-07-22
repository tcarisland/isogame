import React from 'react';
import ISOLayerProps from '../props/ISOLayerProps';

class ISOMapLayer extends React.Component<ISOLayerProps> {
    render() {
        return(<canvas width={this.props.width} height={this.props.height} ></canvas>);
    }
}

export default ISOMapLayer;