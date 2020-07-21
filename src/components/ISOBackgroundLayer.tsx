import React from 'react';
import ISOLayerProps from '../props/ISOLayerProps';
import ISOGrid from '../model/ISOGrid';
import ISOGridConfig from '../model/ISOGridConfig';

class ISOBackgroundLayer extends React.Component<ISOLayerProps> {
    componentDidMount() {
        let width = this.props.width;
        let height = this.props.height;
        let grid = new ISOGrid(new ISOGridConfig(this.props.rows, this.props.columns, width, height));
        let ctx = this.props.canvasRef.current.getContext("2d");
        grid.drawGrid(ctx);
    }
    render() {
        return(<canvas
            ref={ this.props.canvasRef }
            width=  { this.props.width }
            height= { this.props.height }
            className= { "isoCanvas" }
        ></canvas>);
    }
}

export default ISOBackgroundLayer;